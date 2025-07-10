import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLoanOfferSchema1752170640150 implements MigrationInterface {
    name = 'UpdateLoanOfferSchema1752170640150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "monthly_income"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "source_of_income"`);
        await queryRunner.query(`DROP TYPE "public"."consumer_details_source_of_income_enum"`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD "monthly_income" numeric(12,2) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."loan_application_source_of_income_enum" AS ENUM('salaried', 'self_employed', 'business', 'other')`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD "source_of_income" "public"."loan_application_source_of_income_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan_application" DROP COLUMN "source_of_income"`);
        await queryRunner.query(`DROP TYPE "public"."loan_application_source_of_income_enum"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP COLUMN "monthly_income"`);
        await queryRunner.query(`CREATE TYPE "public"."consumer_details_source_of_income_enum" AS ENUM('salaried', 'self_employed', 'business', 'other')`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "source_of_income" "public"."consumer_details_source_of_income_enum"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "monthly_income" numeric(12,2)`);
    }

}
