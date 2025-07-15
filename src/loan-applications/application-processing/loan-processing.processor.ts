import { Job, Queue } from 'bullmq';
import { AmlCheckService } from 'src/external-checks/aml-check/aml-check.service';
import { AmlCheckInput } from 'src/external-checks/aml-check/dtos/aml-check.dto';
import { CreditCheckService } from 'src/external-checks/credit-check/credit-check.service';
import { CreditCheckInput } from 'src/external-checks/credit-check/dtos/credit-check.dto';
import { ExternalCheck } from 'src/external-checks/external-check.entity';
import { KycCheckInput } from 'src/external-checks/kyc-check/dtos/kyc-check.dto';
import { KycCheckService } from 'src/external-checks/kyc-check/kyc-check.service';
import { ManualReviewsService } from 'src/underwriting/manual-reviews/manual-reviews.service';
import { DataSource } from 'typeorm';

import {
  InjectQueue,
  OnWorkerEvent,
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';

import { LoanApplicationHistoryService } from '../loan-application-history/loan-application-history.service';
import { ApplicationStatus, LoanApplication } from '../loan-application.entity';
import { LoanApplicationsService } from '../loan-applications.service';
import { DecisionEngine } from './decision-engine.service';
import { Logger } from '@nestjs/common';

@Processor('loan-processing')
export class LoanProcessingProcessor extends WorkerHost {
  constructor(
    private readonly apps: LoanApplicationsService,
    private readonly kycCheck: KycCheckService,
    private readonly amlCheck: AmlCheckService,
    private readonly creditCheck: CreditCheckService,
    private readonly history: LoanApplicationHistoryService,
    private readonly reviews: ManualReviewsService,
    private readonly engine: DecisionEngine,
    private readonly dataSource: DataSource, // for manual transactions
    private readonly logger: Logger,
    @InjectQueue('loan-processing') private readonly queue: Queue, // handy for retries
  ) {
    super();
  }

  override async process(job: Job<{ loanAppId: string }>): Promise<void> {
    const { loanAppId } = job.data;

    await this.dataSource
      .transaction(async (manager) => {
        const app = (await this.apps.findOne(loanAppId)) as LoanApplication;

        // Prepare payloads
        const kycPayload: KycCheckInput = {
          aadhaar_number: app.consumer.aadhar_number,
          address: `${app.consumer.city}, ${app.consumer.state}`,
          first_name: app.consumer.user.first_name,
          last_name: app.consumer.user.last_name,
          date_of_birth: app.consumer.date_of_birth.toISOString(),
          PAN: app.consumer.pan_number,
          aadhar_document: '',
          pan_document: '',
        };

        const amlPayload: AmlCheckInput = {
          aadhaar_number: app.consumer.aadhar_number,
          PAN: app.consumer.pan_number,
          currency: 'INR',
          customer_name: `${app.consumer.user.first_name} ${app.consumer.user.last_name}`,
          date_of_birth: app.consumer.date_of_birth.toISOString(),
          nationality: 'Indian',
          phone_number: app.consumer.user.phone,
          postcode: app.consumer.pin_code,
        };

        const creditPayload: CreditCheckInput = {
          aadhaar_number: app.consumer.aadhar_number,
          PAN: app.consumer.pan_number,
          address: `${app.consumer.city}, ${app.consumer.state}`,
          date_of_birth: app.consumer.date_of_birth.toISOString(),
          email_id: app.consumer.user.email,
          customer_name: `${app.consumer.user.first_name}, ${app.consumer.user.last_name}`,
          gender: app.consumer.gender,
          marital_status: app.consumer.marital_status,
          monthly_income: app.monthly_income ?? 0,
          sourceOfIncome: app.source_of_income,
          phone_number: app.consumer.user.phone,
          postcode: app.consumer.pin_code,
          nature_of_residence: 'own',
        };

        /* Call external checks (can be parallelised) */
        const [kyc, aml, credit] = await Promise.all([
          this.kycCheck.verify(kycPayload),
          this.amlCheck.amlCheck(amlPayload),
          this.creditCheck.generateScore(creditPayload),
        ]);

        /* Persist raw responses for audit */
        await manager
          .getRepository(ExternalCheck)
          .save([
            ExternalCheck.fromKyc(app, kyc),
            ExternalCheck.fromAml(app, aml),
            ExternalCheck.fromCredit(app, credit),
          ]);

        /* Decide */
        const { finalStatus, note } = this.engine.compute({ kyc, aml, credit });

        /* Update application + history */
        const oldStatus = app.status;
        app.status = finalStatus;
        await manager.getRepository(LoanApplication).save(app);

        await this.history.create({
          loanApplicationId: app.id,
          old_status: oldStatus,
          new_status: app.status,
          change_note: note,
        });

        /* Optional manual review */
        if (finalStatus === ApplicationStatus.UNDER_REVIEW) {
          await this.reviews.create({ loanApplicationId: app.id });
        }
      })
      .catch((err) => console.log(err));
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    this.logger.error(`Job ${job.name} failed. ${err}`);
  }
}
