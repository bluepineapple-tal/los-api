import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly svc: DashboardService) {}

  @Get()
  async me(@Req() req: Request) {
    const roles: string[] =
      req.session.userDataInAccessToken['st-role']?.v ?? [];
    switch (roles[0]) {
      case 'admin':
      case 'super-admin':
        return this.svc.adminStats();
      case 'vendor':
        return this.svc.vendorStats(req.userId);
      default:
        return this.svc.consumerStats(req.userId);
    }
  }
}
