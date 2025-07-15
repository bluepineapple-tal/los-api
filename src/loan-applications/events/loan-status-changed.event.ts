import { ApplicationStatus } from '../loan-application.entity';

export class LoanStatusChangedEvent {
  constructor(
    public readonly applicationId: string,
    public readonly newStatus: ApplicationStatus,
    public readonly note?: string,
  ) {}
}
