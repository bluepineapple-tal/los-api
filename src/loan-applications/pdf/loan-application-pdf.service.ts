import * as PDFDocument from 'pdfkit';

import { Injectable, NotFoundException } from '@nestjs/common';

import { LoanApplicationsService } from '../loan-applications.service';

@Injectable()
export class LoanApplicationPdfService {
  constructor(private readonly apps: LoanApplicationsService) {}

  /** Returns the PDF as a Buffer */
  async build(id: string): Promise<Buffer> {
    const app = await this.apps.findOne(id);
    if (!app) throw new NotFoundException('Application not found');

    // Prepare EMI calculation
    const P = Number(app.requested_amount);
    const rAnnual = Number(app.selectedOffer?.interest_rate ?? 0) / 100;
    const n = app.selectedOffer?.tenure_months ?? 0;
    const processingFee = Number(app.selectedOffer?.processing_fee ?? 0);

    // simple flat‐interest EMI:
    const interestPerMonth = rAnnual / 12;
    const totalInterest = P * interestPerMonth * n;
    const totalRepayable = P + totalInterest + processingFee;
    const emi = totalRepayable / n;

    const doc = new PDFDocument({ size: 'A4', margin: 40 });

    /* ---------- HEADER ---------- */
    doc
      .fontSize(20)
      .text('Loan Application Summary', { align: 'center' })
      .moveDown(0.5)
      .fontSize(10)
      .text(`Application ID: ${app.id}`)
      .text(`Submitted: ${app.application_date.toLocaleString()}`)
      .text(`Status: ${app.status.toUpperCase()}`)
      .moveDown();

    /* ---------- APPLICANT SECTION ---------- */
    doc
      .fontSize(14)
      .text('Applicant Details', { underline: true })
      .moveDown(0.5)
      .fontSize(10)
      .text(
        `Name            : ${app.consumer.user.first_name} ${app.consumer.user.last_name}`,
      )
      .text(`Date of Birth   : ${app.consumer.date_of_birth.toDateString()}`)
      .text(`Gender          : ${app.consumer.gender}`)
      .text(`Marital Status  : ${app.consumer.marital_status}`)
      .text(`Email           : ${app.consumer.user.email}`)
      .text(`Phone           : ${app.consumer.user.phone}`)
      .text(`Aadhaar         : ${app.consumer.aadhar_number}`)
      .text(`PAN             : ${app.consumer.pan_number}`)
      .moveDown(0.5)
      .text(
        `Address         : ${app.consumer.street1}, ${app.consumer.street2}`,
      )
      .text(
        `                  ${app.consumer.city}, ${app.consumer.state} – ${app.consumer.pin_code}`,
      )
      .text(`                  ${app.consumer.country}`)
      .moveDown();

    /* ---------- LOAN DETAILS ---------- */
    doc
      .fontSize(14)
      .text('Product & Loan Details', { underline: true })
      .moveDown(0.5)
      .fontSize(10)
      .text(`Category        : ${app.productCategory.name}`)
      .text(`Offer Name      : ${app.selectedOffer?.offer_name ?? '—'}`)
      .text(
        `Offer Validity  : ${app.selectedOffer?.valid_from.toDateString()}` +
          ` to ${app.selectedOffer?.valid_to.toDateString()}`,
      )
      .moveDown(0.3)
      .text(`Requested Amount: ₹${P.toLocaleString('en-IN')}`)
      .text(`Interest Rate   : ${(rAnnual * 100).toFixed(2)}% p.a.`)
      .text(`Tenure          : ${n} months`)
      .text(`Processing Fee  : ₹${processingFee.toLocaleString('en-IN')}`)
      .moveDown(0.3)
      .text(`Total Interest  : ₹${totalInterest.toLocaleString('en-IN')}`)
      .text(`Total Repayable : ₹${totalRepayable.toLocaleString('en-IN')}`)
      .text(`EMI             : ₹${emi.toFixed(2)}`)
      .moveDown();

    /* ---------- EXTERNAL CHECKS ---------- */
    if (app.externalChecks) {
      const { kyc, aml, credit } = app.externalChecks;
      doc
        .fontSize(14)
        .text('External Checks', { underline: true })
        .moveDown(0.5)
        .fontSize(10);

      if (kyc) {
        doc
          .text(`KYC Status      : ${kyc.status}`)
          .text(`KYC Verified    : ${kyc.verification_status}`)
          .moveDown(0.2);
      }
      if (aml) {
        doc
          .text(`AML Action      : ${aml.action_required}`)
          .text(`Risk Category   : ${aml.risk_category}`)
          .text(`Risk Score      : ${aml.risk_score}`)
          .moveDown(0.2);
      }
      if (credit) {
        doc
          .text(`Credit Score    : ${credit.credit_score}`)
          .text(`Score Band      : ${credit.score_band}`)
          .text(`Provider        : ${credit.score_provider}`)
          .moveDown();
      }
    }

    /* ---------- FOOTER ---------- */
    doc
      .fontSize(8)
      .text(
        `Generated on ${new Date().toLocaleString()}`,
        40,
        doc.page.height - 50,
        {
          align: 'center',
        },
      );

    doc.end();

    const chunks: Buffer[] = [];
    return new Promise<Buffer>((resolve, reject) => {
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });
  }
}
