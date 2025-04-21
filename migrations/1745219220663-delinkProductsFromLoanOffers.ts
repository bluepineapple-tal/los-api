import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DelinkProductsFromLoanOffers1745219220663
  implements MigrationInterface
{
  name = 'DelinkProductsFromLoanOffers1745219220663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Drop old FK, make productModel nullable
    await queryRunner.query(
      `ALTER TABLE "loan_offer" DROP CONSTRAINT "FK_d83d702d1ca094bdf26639800a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan_offer" ALTER COLUMN "productModelId" DROP NOT NULL`,
    );

    // 2. Add new columns with defaults so existing rows aren’t null
    await queryRunner.addColumn(
      'loan_offer',
      new TableColumn({
        name: 'min_amount',
        type: 'numeric',
        precision: 12,
        scale: 2,
        isNullable: false,
        default: 0, // ← temporary default
      }),
    );
    await queryRunner.addColumn(
      'loan_offer',
      new TableColumn({
        name: 'max_amount',
        type: 'numeric',
        precision: 12,
        scale: 2,
        isNullable: false,
        default: 0,
      }),
    );
    await queryRunner.addColumn(
      'loan_offer',
      new TableColumn({
        name: 'valid_from',
        type: 'date',
        isNullable: false,
        default: `'1970-01-01'`, // pick a sensible floor
      }),
    );
    await queryRunner.addColumn(
      'loan_offer',
      new TableColumn({
        name: 'valid_to',
        type: 'date',
        isNullable: false,
        default: `'2099-12-31'`, // pick a sensible ceiling
      }),
    );

    // 3. Drop the defaults so future INSERTs must explicitly set the ranges
    await queryRunner.query(
      `ALTER TABLE "loan_offer" ALTER COLUMN "min_amount" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan_offer" ALTER COLUMN "max_amount" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan_offer" ALTER COLUMN "valid_from" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan_offer" ALTER COLUMN "valid_to" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // reverse: drop new columns, restore NOT NULL + FK
    await queryRunner.dropColumn('loan_offer', 'valid_to');
    await queryRunner.dropColumn('loan_offer', 'valid_from');
    await queryRunner.dropColumn('loan_offer', 'max_amount');
    await queryRunner.dropColumn('loan_offer', 'min_amount');

    await queryRunner.query(
      `ALTER TABLE "loan_offer" ALTER COLUMN "productModelId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan_offer"
         ADD CONSTRAINT "FK_d83d702d1ca094bdf26639800a6"
         FOREIGN KEY ("productModelId") REFERENCES "product_model"("id")
         ON DELETE CASCADE`,
    );
  }
}
