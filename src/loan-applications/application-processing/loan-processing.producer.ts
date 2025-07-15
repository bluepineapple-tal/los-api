import { Queue } from 'bullmq';

import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoanProcessingProducer {
  constructor(@InjectQueue('loan-processing') private readonly queue: Queue) {}

  enqueue(loanAppId: string) {
    return this.queue.add('process', { loanAppId });
  }
}
