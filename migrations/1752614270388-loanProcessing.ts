import { MigrationInterface, QueryRunner } from "typeorm";

export class LoanProcessing1752614270388 implements MigrationInterface {
    name = 'LoanProcessing1752614270388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."product_category_status_enum" RENAME TO "product_category_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."product_category_status_enum" AS ENUM('active', 'inactive', 'discontinued')`);
        await queryRunner.query(`ALTER TABLE "product_category" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_category" ALTER COLUMN "status" TYPE "public"."product_category_status_enum" USING "status"::"text"::"public"."product_category_status_enum"`);
        await queryRunner.query(`ALTER TABLE "product_category" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`DROP TYPE "public"."product_category_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."loan_application_source_of_income_enum" RENAME TO "loan_application_source_of_income_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."loan_application_source_of_income_enum" AS ENUM('salaried', 'self_employed', 'business', 'freelancer', 'unemployed', 'other')`);
        await queryRunner.query(`ALTER TABLE "loan_application" ALTER COLUMN "source_of_income" TYPE "public"."loan_application_source_of_income_enum" USING "source_of_income"::"text"::"public"."loan_application_source_of_income_enum"`);
        await queryRunner.query(`DROP TYPE "public"."loan_application_source_of_income_enum_old"`);
        await queryRunner.query(`ALTER TABLE "external_check" DROP COLUMN "response_data"`);
        await queryRunner.query(`ALTER TABLE "external_check" ADD "response_data" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_check" DROP COLUMN "response_data"`);
        await queryRunner.query(`ALTER TABLE "external_check" ADD "response_data" text`);
        await queryRunner.query(`CREATE TYPE "public"."loan_application_source_of_income_enum_old" AS ENUM('salaried', 'self_employed', 'business', 'other')`);
        await queryRunner.query(`ALTER TABLE "loan_application" ALTER COLUMN "source_of_income" TYPE "public"."loan_application_source_of_income_enum_old" USING "source_of_income"::"text"::"public"."loan_application_source_of_income_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."loan_application_source_of_income_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."loan_application_source_of_income_enum_old" RENAME TO "loan_application_source_of_income_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."product_category_status_enum_old" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`ALTER TABLE "product_category" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_category" ALTER COLUMN "status" TYPE "public"."product_category_status_enum_old" USING "status"::"text"::"public"."product_category_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "product_category" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`DROP TYPE "public"."product_category_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."product_category_status_enum_old" RENAME TO "product_category_status_enum"`);
    }

}
