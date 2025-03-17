import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlugColumns1742113657369 implements MigrationInterface {
  name = 'AddSlugColumns1742113657369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Add the slug columns as nullable
    await queryRunner.query(
      `ALTER TABLE "product_make" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" ADD "slug" character varying`,
    );

    // 2. Populate the slug columns using a simple transformation:
    //    Convert the name to lowercase and replace spaces with hyphens.
    await queryRunner.query(`
          UPDATE "product_make"
          SET "slug" = lower(regexp_replace("name", '\\s+', '-', 'g'))
        `);
    await queryRunner.query(`
          UPDATE "product_model"
          SET "slug" = lower(regexp_replace("name", '\\s+', '-', 'g'))
        `);

    // 3. Alter the columns to be NOT NULL and add unique constraints
    await queryRunner.query(
      `ALTER TABLE "product_make" ALTER COLUMN "slug" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_make" ADD CONSTRAINT "UQ_6002cece42b5d40784ce3d851dc" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" ALTER COLUMN "slug" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" ADD CONSTRAINT "UQ_46c2b0441c016660c40e6d514a5" UNIQUE ("slug")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_model" DROP CONSTRAINT "UQ_46c2b0441c016660c40e6d514a5"`,
    );
    await queryRunner.query(`ALTER TABLE "product_model" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "product_make" DROP CONSTRAINT "UQ_6002cece42b5d40784ce3d851dc"`,
    );
    await queryRunner.query(`ALTER TABLE "product_make" DROP COLUMN "slug"`);
  }
}
