import * as PDFDocument from 'pdfkit';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanApplicationsService } from '../loan-applications.service';

@Injectable()
export class LoanApplicationPdfService {
  constructor(private readonly apps: LoanApplicationsService) {}

  async build(id: string): Promise<Buffer> {
    const app = await this.apps.findOne(id);
    if (!app) throw new NotFoundException('Application not found');

    /* ---------- CONSTANTS ---------- */
    const PRIMARY = '#3F51B5';
    const ROW_ALT = '#F3F4F7';
    const BORDER = '#CFD2DC';
    const TXT = '#212121';
    const MARGIN = 50;
    const COL1 = 140; // “Field” column

    const doc = new PDFDocument({ size: 'A4', margin: MARGIN });
    const left = doc.page.margins.left;
    const pageW =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const COL2 = pageW - COL1;

    doc.registerFont('Bold', 'Helvetica-Bold');
    doc.registerFont('Regular', 'Helvetica');

    /* util: ensure enough vertical space or create new page */
    const ensureSpace = (needed: number) => {
      const avail = doc.page.height - doc.y - doc.page.margins.bottom - needed;
      if (avail < 0) doc.addPage();
    };

    /* util: heading */
    const heading = (t: string) => {
      ensureSpace(24);
      doc.font('Bold').fontSize(13).fillColor(PRIMARY).text(t, left, doc.y);
      doc.moveDown(0.4);
    };

    /* util: flexible row (auto height) */
    const row = (
      key: string,
      value: string,
      rowIdx: number,
      opts: { header?: boolean } = {},
    ) => {
      const textOptions = { width: COL2 - 10, lineBreak: true };

      /* measure height */
      const hKey = doc.heightOfString(key, { width: COL1 - 10 });
      const hValue = doc.heightOfString(value, textOptions);
      const h = Math.max(hKey, hValue) + 6; // 3 pt top/bottom pad

      ensureSpace(h);
      const yStart = doc.y;

      /* background + border */
      if (!opts.header) {
        doc
          .rect(left, yStart, COL1 + COL2, h)
          .fill(rowIdx % 2 ? ROW_ALT : '#FFFFFF')
          .strokeColor(BORDER)
          .lineWidth(0.25)
          .stroke();
      } else {
        doc.rect(left, yStart, COL1 + COL2, h).fill(PRIMARY);
      }

      /* text */
      doc
        .fillColor(opts.header ? '#fff' : TXT)
        .font(opts.header ? 'Bold' : 'Regular')
        .fontSize(10)
        .text(key, left + 5, yStart + 3, { width: COL1 - 10 })
        .text(value, left + COL1 + 5, yStart + 3, textOptions);

      doc.y = yStart + h; // advance baseline
    };

    /* ---------- HEADER ---------- */
    doc
      .font('Bold')
      .fillColor(PRIMARY)
      .fontSize(20)
      .text('Loan Application Summary', { align: 'center' })
      .moveDown(0.5);

    doc
      .font('Regular')
      .fillColor(TXT)
      .fontSize(10)
      .text(`Application ID : ${app.id}`)
      .text(
        `Submitted      : ${app.application_date.toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}`,
      )
      .text(`Status         : ${app.status.toUpperCase()}`)
      .moveDown();

    /* ---------- APPLICANT ---------- */
    heading('Applicant Details');
    const applicantRows: [string, string][] = [
      [
        'Name',
        `${app.consumer.user.first_name} ${app.consumer.user.last_name}`,
      ],
      [
        'Date of Birth',
        new Date(app.consumer.date_of_birth).toLocaleDateString(),
      ],
      ['Gender', app.consumer.gender],
      ['Marital Status', app.consumer.marital_status],
      ['Email', app.consumer.user.email],
      ['Phone', app.consumer.user.phone],
      ['Aadhaar', app.consumer.aadhar_number],
      ['PAN', app.consumer.pan_number],
      [
        'Address',
        `${app.consumer.street1}, ${app.consumer.street2}\n` +
          `${app.consumer.city}, ${app.consumer.state} – ${app.consumer.pin_code}, ${app.consumer.country}`,
      ],
    ];

    row('Field', 'Value', 0, { header: true });
    applicantRows.forEach((r, i) => row(r[0], r[1], i + 1));
    doc.moveDown();

    /* ---------- LOAN DETAILS ---------- */
    heading('Product & Loan Details');
    const P = Number(app.requested_amount);
    const rAnnual = Number(app.selectedOffer.interest_rate) / 100;
    const months = Number(app.selectedOffer.tenure_months);
    const fee = Number(app.selectedOffer.processing_fee);
    const intAmt = P * rAnnual * (months / 12);
    const total = P + intAmt + fee;
    const emi = total / months;

    const loanRows: [string, string][] = [
      ['Category', app.productCategory.name],
      ['Offer Name', app.selectedOffer.offer_name],
      [
        'Offer Validity',
        `${new Date(app.selectedOffer.valid_from).toLocaleDateString()} – ` +
          new Date(app.selectedOffer.valid_to).toLocaleDateString(),
      ],
      [
        'Requested Amount',
        P.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      ],
      ['Interest Rate', `${app.selectedOffer.interest_rate}% p.a.`],
      ['Tenure', `${months} months`],
      [
        'Processing Fee',
        fee.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      ],
      [
        'Total Interest',
        intAmt.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      ],
      [
        'Total Payable',
        total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      ],
      [
        'EMI',
        emi.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      ],
    ];

    row('Field', 'Value', 0, { header: true });
    loanRows.forEach((r, i) => row(r[0], r[1], i + 1));
    doc.moveDown();

    /* ---------- EXTERNAL CHECKS ---------- */
    if (app.externalChecks) {
      heading('External Checks');
      const rows: [string, string][] = [];
      const { kyc, aml, credit } = app.externalChecks;
      if (kyc) {
        rows.push(['KYC Status', kyc.status]);
        rows.push(['KYC Verified', kyc.verification_status]);
      }
      if (aml) {
        rows.push(['AML Action', aml.action_required]);
        rows.push(['Risk Category', aml.risk_category]);
        rows.push(['Risk Score', String(aml.risk_score)]);
      }
      if (credit) {
        rows.push(['Credit Score', String(credit.credit_score)]);
        rows.push(['Score Band', credit.score_band]);
        rows.push(['Provider', credit.score_provider]);
      }
      row('Field', 'Value', 0, { header: true });
      rows.forEach((r, i) => row(r[0], r[1], i + 1));
      doc.moveDown();
    }

    /* ---------- FOOTER (only if room left, else new page) ---------- */
    const footerTxt = `Generated on ${new Date().toLocaleString()}`;
    const hFooter = doc.heightOfString(footerTxt);
    doc
      .font('Regular')
      .fontSize(8)
      .fillColor('#757575')
      .text(
        footerTxt,
        left,
        doc.page.height - doc.page.margins.bottom - hFooter,
        {
          align: 'center',
        },
      );

    doc.end();

    /* Collect into Buffer */
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      doc.on('data', (c) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });
  }
}
