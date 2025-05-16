import { AmlCheckResolver } from './aml-check.resolver';
import { Module } from '@nestjs/common';
import { AmlCheckController } from './aml-check.controller';
import { AmlCheckService } from './aml-check.service';

@Module({
  controllers: [AmlCheckController],
  providers: [AmlCheckService, AmlCheckResolver],
})
export class AmlCheckModule {}
