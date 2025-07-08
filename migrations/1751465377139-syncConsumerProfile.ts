import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncConsumerProfile1751465377139 implements MigrationInterface {
    name = 'SyncConsumerProfile1751465377139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consumer_kyc" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aadhar_path" character varying NOT NULL, "pan_path" character varying NOT NULL, "consumerId" uuid, CONSTRAINT "REL_24699745a4da40461eed45a350" UNIQUE ("consumerId"), CONSTRAINT "PK_471f338df20100f6f24a97d8243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "date_of_birth" TIMESTAMP`);
        await queryRunner.query(`CREATE TYPE "public"."consumer_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "gender" "public"."consumer_gender_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."consumer_marital_status_enum" AS ENUM('single', 'married', 'divorced', 'widowed')`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "marital_status" "public"."consumer_marital_status_enum"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "alt_phone" character varying`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "monthly_income" numeric(12,2)`);
        await queryRunner.query(`CREATE TYPE "public"."consumer_source_of_income_enum" AS ENUM('salaried', 'self_employed', 'business', 'other')`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "source_of_income" "public"."consumer_source_of_income_enum"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "aadhar_number" character varying`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD CONSTRAINT "UQ_0e3069b7d9cb660aa559a1279e1" UNIQUE ("aadhar_number")`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "pan_number" character varying`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD CONSTRAINT "UQ_b6ae31f2279397a027908832c46" UNIQUE ("pan_number")`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "addressStreet1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "addressStreet2" character varying`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "addressCity" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "addressState" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "addressPin_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "addressCountry" character varying NOT NULL DEFAULT 'India'`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_8ecf52664149a799532b7b0b7e5"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "UQ_8ecf52664149a799532b7b0b7e5"`);
        await queryRunner.query(`ALTER TABLE "consumer_kyc" ADD CONSTRAINT "FK_24699745a4da40461eed45a350b" FOREIGN KEY ("consumerId") REFERENCES "consumer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_8ecf52664149a799532b7b0b7e5" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_8ecf52664149a799532b7b0b7e5"`);
        await queryRunner.query(`ALTER TABLE "consumer_kyc" DROP CONSTRAINT "FK_24699745a4da40461eed45a350b"`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "UQ_8ecf52664149a799532b7b0b7e5" UNIQUE ("product_category_id")`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_8ecf52664149a799532b7b0b7e5" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "addressCountry"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "addressPin_code"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "addressState"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "addressCity"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "addressStreet2"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "addressStreet1"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP CONSTRAINT "UQ_b6ae31f2279397a027908832c46"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "pan_number"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP CONSTRAINT "UQ_0e3069b7d9cb660aa559a1279e1"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "aadhar_number"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "source_of_income"`);
        await queryRunner.query(`DROP TYPE "public"."consumer_source_of_income_enum"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "monthly_income"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "alt_phone"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "marital_status"`);
        await queryRunner.query(`DROP TYPE "public"."consumer_marital_status_enum"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."consumer_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD "dob" TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "consumer_kyc"`);
    }

}
