import { Request } from 'express';

import { Controller, ForbiddenException, Get, Req } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly svc: DashboardService) {}

  @Get('admin')
  async admin(@Req() req: Request) {
    this.ensureRole(req, 'admin');
    return this.svc.adminStats();
  }

  @Get('vendor')
  async vendor(@Req() req: Request) {
    this.ensureRole(req, 'vendor');
    return this.svc.vendorStats(req.userId);
  }

  @Get('consumer')
  async me(@Req() req: Request) {
    this.ensureRole(req, 'consumer');
    return this.svc.consumerStats(req.userId);
  }

  /* --------------- helpers ---------------- */
  private ensureRole(req: Request, role: string) {
    // const roles: string[] =
    //   req['session']?.getAccessTokenPayload()?.['st-role']?.v ?? [];
    // if (!roles.includes(role))
    //   throw new ForbiddenException(`Requires ${role} role`);
  }
}
