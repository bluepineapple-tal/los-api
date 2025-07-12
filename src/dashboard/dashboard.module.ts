import { LoanApplication } from 'src/loan-applications/loan-application.entity';
import { User } from 'src/users/user.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanApplication, User])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
