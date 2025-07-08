import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserSchemas1751874185665 implements MigrationInterface {
    name = 'UpdateUserSchemas1751874185665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer_kyc" DROP CONSTRAINT "FK_24699745a4da40461eed45a350b"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_baf65a1a24467445ecf918e78cf"`);
        await queryRunner.query(`CREATE TYPE "public"."consumer_details_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."consumer_details_marital_status_enum" AS ENUM('single', 'married', 'divorced', 'widowed')`);
        await queryRunner.query(`CREATE TYPE "public"."consumer_details_source_of_income_enum" AS ENUM('salaried', 'self_employed', 'business', 'other')`);
        await queryRunner.query(`CREATE TABLE "consumer_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_of_birth" TIMESTAMP, "gender" "public"."consumer_details_gender_enum", "marital_status" "public"."consumer_details_marital_status_enum", "alt_phone" character varying, "monthly_income" numeric(12,2), "source_of_income" "public"."consumer_details_source_of_income_enum", "aadhar_number" character varying, "pan_number" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "addressStreet1" character varying NOT NULL, "addressStreet2" character varying, "addressCity" character varying NOT NULL, "addressState" character varying NOT NULL, "addressPin_code" character varying NOT NULL, "addressCountry" character varying NOT NULL DEFAULT 'India', CONSTRAINT "UQ_c337f73bc97a6852aa00185afa1" UNIQUE ("aadhar_number"), CONSTRAINT "UQ_4f081b7daeac6e9593db150f3f3" UNIQUE ("pan_number"), CONSTRAINT "REL_48c99c5bbb5580f2087a053c22" UNIQUE ("user_id"), CONSTRAINT "PK_1c11d9565dba24b0d3e0b6c9981" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendor_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "business_name" character varying NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_d45a115f63360b929e5e4844ee" UNIQUE ("user_id"), CONSTRAINT "PK_191324acb46928eed4a8412c293" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "supertokensUserId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_315d7b04db5b36bda6d24d2d137" UNIQUE ("supertokensUserId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD CONSTRAINT "FK_48c99c5bbb5580f2087a053c22c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumer_kyc" ADD CONSTRAINT "FK_24699745a4da40461eed45a350b" FOREIGN KEY ("consumerId") REFERENCES "consumer_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_baf65a1a24467445ecf918e78cf" FOREIGN KEY ("consumerId") REFERENCES "consumer_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendor_details" ADD CONSTRAINT "FK_d45a115f63360b929e5e4844ee2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor_details" DROP CONSTRAINT "FK_d45a115f63360b929e5e4844ee2"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_baf65a1a24467445ecf918e78cf"`);
        await queryRunner.query(`ALTER TABLE "consumer_kyc" DROP CONSTRAINT "FK_24699745a4da40461eed45a350b"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP CONSTRAINT "FK_48c99c5bbb5580f2087a053c22c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_8e1f623798118e629b46a9e6299"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_315d7b04db5b36bda6d24d2d137"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "supertokensUserId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password_hash" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "vendor_details"`);
        await queryRunner.query(`DROP TABLE "consumer_details"`);
        await queryRunner.query(`DROP TYPE "public"."consumer_details_source_of_income_enum"`);
        await queryRunner.query(`DROP TYPE "public"."consumer_details_marital_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."consumer_details_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_baf65a1a24467445ecf918e78cf" FOREIGN KEY ("consumerId") REFERENCES "consumer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumer_kyc" ADD CONSTRAINT "FK_24699745a4da40461eed45a350b" FOREIGN KEY ("consumerId") REFERENCES "consumer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
