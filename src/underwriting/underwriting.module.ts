import { Module } from '@nestjs/common';
import { UnderwritingService } from './underwriting.service';

@Module({
  providers: [UnderwritingService]
})
export class UnderwritingModule {}
