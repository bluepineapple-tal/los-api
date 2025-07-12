// los-api/src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ApplicationStatus,
  LoanApplication,
} from 'src/loan-applications/loan-application.entity';
import { User } from 'src/users/user.entity';
import { Repository, Between, MoreThan } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(LoanApplication)
    private readonly appRepo: Repository<LoanApplication>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /* -------- ADMIN -------------------------------------------------- */
  async adminStats() {
    const now = new Date();
    const day24 = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [newApps24h, prev24h] = await Promise.all([
      this.appRepo.count({ where: { created_at: MoreThan(day24) } }),
      this.appRepo.count({
        where: {
          created_at: Between(
            new Date(day24.getTime() - 24 * 60 * 60 * 1000),
            day24,
          ),
        },
      }),
    ]);
    const newAppsTrend = prev24h ? ((newApps24h - prev24h) / prev24h) * 100 : 0;

    const approvedMonth = await this.appRepo.count({
      where: {
        status: ApplicationStatus.APPROVED,
        created_at: Between(monthStart, now),
      },
    });

    const rejectRate = await this.rejectRate(now);
    const totalDisbursed = await this.totalDisbursed();

    return {
      newApps24h,
      newAppsTrend,
      approvedMonth,
      approvedTrend: 0, // compute if needed
      rejectRate,
      rejectRateTrend: 0,
      totalDisbursed,
    };
  }

  private async rejectRate(now: Date) {
    const [approved, rejected] = await Promise.all([
      this.appRepo.count({ where: { status: ApplicationStatus.APPROVED } }),
      this.appRepo.count({ where: { status: ApplicationStatus.REJECTED } }),
    ]);
    const total = approved + rejected;
    return total ? (rejected / total) * 100 : 0;
  }

  private async totalDisbursed() {
    const { sum } = await this.appRepo
      .createQueryBuilder('la')
      .select('SUM(la.requested_amount)', 'sum')
      .where('la.status = :s', { s: ApplicationStatus.APPROVED })
      .getRawOne();
    return Number(sum) || 0;
  }

  /* -------- VENDOR ------------------------------------------------- */
  async vendorStats(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['vendorProfile'],
    });

    const appsReferred = await this.appRepo.count({
      where: { underwriter: { id: user.vendorProfile.id } }, // TODO: This needs to be replaced - dont have refferals
    });
    // sample numbers – you’ll adjust for your schema:
    return {
      appsReferred,
      appsTrend: 5, // dummy
      commission: 42000,
      avgTicket: 52000,
    };
  }

  /* -------- CONSUMER ----------------------------------------------- */
  async consumerStats(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['consumerProfile'],
    });
    const activeLoans = await this.appRepo.count({
      where: {
        consumer: { id: user.consumerProfile.id },
        status: ApplicationStatus.APPROVED,
      },
    });
    return {
      activeLoans,
      nextEmi: 3500,
      nextEmiDate: '15-Aug-25',
      creditScore: 712,
      scoreTrend: 2,
    };
  }
}
