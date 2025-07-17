import {
  ApplicationStatus,
  LoanApplication,
} from 'src/loan-applications/loan-application.entity';
import { User } from 'src/users/user.entity';
import { Between, MoreThan, Repository } from 'typeorm';

// los-api/src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
    const t24h = new Date(now.getTime() - 86_400_000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [newApps24h, prev24h, approvedMTD, rejectedMTD, approvedTotal] =
      await Promise.all([
        this.appRepo.count({ where: { created_at: MoreThan(t24h) } }),
        this.appRepo.count({
          where: {
            created_at: Between(new Date(t24h.getTime() - 86_400_000), t24h),
          },
        }),
        this.appRepo.count({
          where: {
            status: ApplicationStatus.APPROVED,
            created_at: Between(monthStart, now),
          },
        }),
        this.appRepo.count({
          where: {
            status: ApplicationStatus.REJECTED,
            created_at: Between(monthStart, now),
          },
        }),
        this.totalApproved(),
      ]);

    const totalMTD = approvedMTD + rejectedMTD;
    const approvalPct = totalMTD ? (approvedMTD / totalMTD) * 100 : 0;

    return {
      cards: [
        {
          title: 'New applications (24 h)',
          value: newApps24h,
          trendPct: prev24h ? ((newApps24h - prev24h) / prev24h) * 100 : 0,
        },
        {
          title: 'MTD approval rate',
          value: `${approvalPct.toFixed(1)} %`,
          trendPct: 0, // leave if you have no previous month data yet
        },
        {
          title: 'MTD rejections',
          value: rejectedMTD,
          trendPct: 0,
        },
        {
          title: 'Approved Total',
          value: `₹${(approvedTotal / 1_00_000).toFixed(1)} L`,
          currency: true,
        },
      ],
      /* for the line-chart ↓ */
      chart: {
        data: await this.applicationsPerDay(90),
        title: 'Total Applications',
        subtitle: 'Total applications for last 3 months',
      },
    };
  }

  /* -------- VENDOR ------------------------------------------------- */
  async vendorStats(userId: string) {
    const { vendorProfile } = await this.userRepo.findOneOrFail({
      where: { id: userId },
      relations: ['vendorProfile'],
    });

    const monthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );

    const [referredMonth, approvedReferred, sumPrincipal] = await Promise.all([
      this.appRepo.count({
        where: {
          underwriter: { id: vendorProfile.id },
          created_at: MoreThan(monthStart),
        },
      }),
      this.appRepo.count({
        where: {
          underwriter: { id: vendorProfile.id },
          status: ApplicationStatus.APPROVED,
          created_at: MoreThan(monthStart),
        },
      }),
      this.appRepo
        .createQueryBuilder('la')
        .select('SUM(la.requested_amount)', 'sum')
        .where('la.underwriter_id = :u', { u: vendorProfile.id })
        .andWhere('la.created_at > :d', { d: monthStart })
        .getRawOne()
        .then((r) => Number(r.sum) || 0),
    ]);

    const commission = sumPrincipal * 0.02; // 2 % ref-commission

    return {
      cards: [
        { title: 'Apps referred (MTD)', value: referredMonth },
        { title: 'Approved referrals', value: approvedReferred },
        { title: 'Commission earned', value: commission, currency: true },
        {
          title: 'Avg ticket',
          value: approvedReferred ? sumPrincipal / approvedReferred : 0,
          currency: true,
        },
      ],
      chart: {
        data: await this.referredAppsPerDay(vendorProfile.id, 30),
        title: 'Referred Apps',
        subtitle: 'Total referred apps for last 3 months',
      },
    };
  }

  /* -------- CONSUMER ----------------------------------------------- */
  async consumerStats(userId: string) {
    const { consumerProfile } = await this.userRepo.findOneOrFail({
      where: { id: userId },
      relations: ['consumerProfile'],
    });

    const activeLoans = await this.appRepo.find({
      where: {
        consumer: { id: consumerProfile.id },
        status: ApplicationStatus.APPROVED,
      },
      relations: ['selectedOffer'],
    });

    const totalOutstanding = activeLoans.reduce((sum, la) => {
      const oi = Number(la.selectedOffer.interest_rate) / 100;
      const gross =
        Number(la.requested_amount) * (1 + oi) +
        Number(la.selectedOffer.processing_fee);
      return sum + gross;
    }, 0);

    const nextEmi = activeLoans.length
      ? totalOutstanding / activeLoans[0].selectedOffer.tenure_months
      : 0;

    /* latest credit score */
    const { credit_score } =
      (await this.appRepo
        .createQueryBuilder('la')
        .innerJoin('la.externalChecks', 'ec')
        .where('la.consumer_id = :c', { c: consumerProfile.id })
        .andWhere("ec.check_type = 'CREDIT'")
        .orderBy('ec.created_at', 'DESC')
        .select("ec.response_data::json->>'credit_score'", 'credit_score')
        .limit(1)
        .getRawOne()) ?? {};

    return {
      cards: [
        { title: 'Active loans', value: activeLoans.length },
        {
          title: 'Total outstanding',
          value: totalOutstanding,
          currency: true,
        },
        {
          title: 'Next EMI',
          value: nextEmi,
          currency: true,
        },
        {
          title: 'Credit score',
          value: credit_score ?? '—',
        },
      ],
      chart: {
        data: await this.balanceTrend(consumerProfile.id, 30),
        title: 'Balance Trend',
        subtitle: 'Balance trend for last 3 months',
      },
    };
  }

  /* ------------- shared helpers for charts -------------- */

  private async totalApproved() {
    const { sum } = await this.appRepo
      .createQueryBuilder('la')
      .select('SUM(la.requested_amount)', 'sum')
      .where('la.status = :s', { s: ApplicationStatus.APPROVED })
      .getRawOne();
    return Number(sum) || 0;
  }

  /**
   * Return [{ date, count }] for the last N days.
   * Works on PostgreSQL & avoids the INTERVAL-param bug.
   */
  private async applicationsPerDay(days: number) {
    const from = new Date();
    from.setDate(from.getDate() - days); // JS date arithmetic

    return this.appRepo
      .createQueryBuilder()
      .select(
        "DATE_TRUNC('day', created_at)::date      AS date, \
         COUNT(*)::int                            AS count",
      )
      .where('created_at >= :from', { from }) // ← ✨ no INTERVAL
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
  }

  private async referredAppsPerDay(vendorId: string, days: number) {
    const from = new Date();
    from.setDate(from.getDate() - days);

    return this.appRepo
      .createQueryBuilder()
      .select(
        "DATE_TRUNC('day', created_at)::date AS date, \
         COUNT(*)::int                       AS count",
      )
      .where('underwriter_id = :u', { u: vendorId })
      .andWhere('created_at >= :from', { from })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
  }

  private async balanceTrend(consumerId: string, days: number) {
    const from = new Date();
    from.setDate(from.getDate() - days);

    return this.appRepo
      .createQueryBuilder('la')
      .select(
        "DATE_TRUNC('day', la.created_at)::date AS date, \
         SUM(la.requested_amount)::numeric      AS balance",
      )
      .where('la.consumer_id = :c', { c: consumerId })
      .andWhere('la.created_at >= :from', { from })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
  }
}
