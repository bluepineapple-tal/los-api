import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1739034247067 implements MigrationInterface {
    name = 'InitSchema1739034247067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_status_enum" AS ENUM('active', 'inactive', 'discontinued')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "price" numeric(12,2) NOT NULL, "status" "public"."product_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "vendorId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loan_offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "interest_rate" numeric(5,2) NOT NULL, "tenure_months" integer NOT NULL, "processing_fee" numeric(10,2) NOT NULL, "offer_name" character varying NOT NULL, "offer_details" text, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, "createdById" uuid, CONSTRAINT "PK_6a57f20b55378194073699c662a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consumer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "dob" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_7c0e24da90f3831cc0f1f25b2a" UNIQUE ("user_id"), CONSTRAINT "PK_85625b4d465d3aa0eb905127822" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."loan_application_status_enum" AS ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected', 'escalated')`);
        await queryRunner.query(`CREATE TABLE "loan_application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "application_date" TIMESTAMP NOT NULL, "status" "public"."loan_application_status_enum" NOT NULL DEFAULT 'draft', "requested_amount" numeric(12,2), "manual_review_needed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "consumerId" uuid, "productId" uuid NOT NULL, "loanOfferId" uuid NOT NULL, "underwriterId" uuid, CONSTRAINT "PK_a8e4b60ea8218fb408a4c4ab2c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_status_enum" AS ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected', 'escalated')`);
        await queryRunner.query(`CREATE TABLE "loan_application_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "old_status" "public"."application_status_enum" NOT NULL, "new_status" "public"."application_status_enum" NOT NULL, "changed_at" TIMESTAMP NOT NULL DEFAULT now(), "change_note" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "loanApplicationId" uuid, "changedById" uuid, CONSTRAINT "PK_124cabdc1c0482c47b29ee8a206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."manual_review_review_status_enum" AS ENUM('pending', 'in_progress', 'escalated', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "manual_review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "review_status" "public"."manual_review_review_status_enum" NOT NULL DEFAULT 'pending', "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "loanApplicationId" uuid, "underwriterId" uuid, CONSTRAINT "PK_487e9190d8c760eb649419f461e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('vendor', 'nbfc_personnel', 'underwriter', 'consumer', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive', 'suspended')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'consumer', "status" "public"."user_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "business_name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_139dbded1008da1588c16f34a4" UNIQUE ("user_id"), CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blacklist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pan" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "UQ_63c9172473af1edf91781cd4d64" UNIQUE ("pan"), CONSTRAINT "REL_737fd64e4d088f113eae9a232c" UNIQUE ("user_id"), CONSTRAINT "PK_04dc42a96bf0914cda31b579702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."external_check_check_type_enum" AS ENUM('CREDIT', 'KYC', 'AML')`);
        await queryRunner.query(`CREATE TYPE "public"."external_check_check_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "external_check" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "check_type" "public"."external_check_check_type_enum" NOT NULL, "check_status" "public"."external_check_check_status_enum" NOT NULL DEFAULT 'pending', "response_data" text, "requested_at" TIMESTAMP NOT NULL DEFAULT now(), "responded_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "loanApplicationId" uuid, CONSTRAINT "PK_b22d60a9aa6ac333db4d459280b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."underwriting_result_decision_enum" AS ENUM('approve', 'reject', 'escalate')`);
        await queryRunner.query(`CREATE TABLE "underwriting_result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "decision" "public"."underwriting_result_decision_enum" NOT NULL, "reason" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "loanApplicationId" uuid, "ruleId" uuid, CONSTRAINT "PK_0e511d73a00effbe0031dac70d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "underwriting_rule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rule_name" character varying NOT NULL, "rule_desc" text NOT NULL, "conditions" text NOT NULL, "action" character varying NOT NULL, "priority" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6943a776eded7a27206e2e89068" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_document_doc_type_enum" AS ENUM('KYC', 'ID', 'INCOME_PROOF')`);
        await queryRunner.query(`CREATE TYPE "public"."application_document_status_enum" AS ENUM('pending', 'verified', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "application_document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doc_type" "public"."application_document_doc_type_enum" NOT NULL, "file_path" character varying NOT NULL, "uploaded_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."application_document_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "loanApplicationId" uuid, CONSTRAINT "PK_04f1535a911d17b4c6283de0d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_921582066aa70b502e78ea92012" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_offer" ADD CONSTRAINT "FK_112395cc7319cfdc5678a8b97ac" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_offer" ADD CONSTRAINT "FK_ce39cb105ca3f07dd3e02232890" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumer" ADD CONSTRAINT "FK_7c0e24da90f3831cc0f1f25b2a9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_baf65a1a24467445ecf918e78cf" FOREIGN KEY ("consumerId") REFERENCES "consumer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_4d8a4dbd947a6973f8a34bd866f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_0ba347cced47e2bd9e726acb5e1" FOREIGN KEY ("loanOfferId") REFERENCES "loan_offer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_95863f9de1e69a52232abbc4fda" FOREIGN KEY ("underwriterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application_history" ADD CONSTRAINT "FK_86ec46427f221d64bbb0915748e" FOREIGN KEY ("loanApplicationId") REFERENCES "loan_application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application_history" ADD CONSTRAINT "FK_8a8dd95df8916f7bcca3060ce20" FOREIGN KEY ("changedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manual_review" ADD CONSTRAINT "FK_bf5c87d481ec5e680a571d4f847" FOREIGN KEY ("loanApplicationId") REFERENCES "loan_application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manual_review" ADD CONSTRAINT "FK_1f9388a4f22974470d8df0d0ad7" FOREIGN KEY ("underwriterId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD CONSTRAINT "FK_139dbded1008da1588c16f34a40" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD CONSTRAINT "FK_737fd64e4d088f113eae9a232cd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "external_check" ADD CONSTRAINT "FK_d381ea1c5169bc86c1dbac6daa3" FOREIGN KEY ("loanApplicationId") REFERENCES "loan_application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "underwriting_result" ADD CONSTRAINT "FK_a1e27b845e786851f9a1073ed5b" FOREIGN KEY ("loanApplicationId") REFERENCES "loan_application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "underwriting_result" ADD CONSTRAINT "FK_e008b6ca8d632000c41e606c6de" FOREIGN KEY ("ruleId") REFERENCES "underwriting_rule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application_document" ADD CONSTRAINT "FK_4410a07f00ddcba9d8bfc7f3c43" FOREIGN KEY ("loanApplicationId") REFERENCES "loan_application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_document" DROP CONSTRAINT "FK_4410a07f00ddcba9d8bfc7f3c43"`);
        await queryRunner.query(`ALTER TABLE "underwriting_result" DROP CONSTRAINT "FK_e008b6ca8d632000c41e606c6de"`);
        await queryRunner.query(`ALTER TABLE "underwriting_result" DROP CONSTRAINT "FK_a1e27b845e786851f9a1073ed5b"`);
        await queryRunner.query(`ALTER TABLE "external_check" DROP CONSTRAINT "FK_d381ea1c5169bc86c1dbac6daa3"`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP CONSTRAINT "FK_737fd64e4d088f113eae9a232cd"`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP CONSTRAINT "FK_139dbded1008da1588c16f34a40"`);
        await queryRunner.query(`ALTER TABLE "manual_review" DROP CONSTRAINT "FK_1f9388a4f22974470d8df0d0ad7"`);
        await queryRunner.query(`ALTER TABLE "manual_review" DROP CONSTRAINT "FK_bf5c87d481ec5e680a571d4f847"`);
        await queryRunner.query(`ALTER TABLE "loan_application_history" DROP CONSTRAINT "FK_8a8dd95df8916f7bcca3060ce20"`);
        await queryRunner.query(`ALTER TABLE "loan_application_history" DROP CONSTRAINT "FK_86ec46427f221d64bbb0915748e"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_95863f9de1e69a52232abbc4fda"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_0ba347cced47e2bd9e726acb5e1"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_4d8a4dbd947a6973f8a34bd866f"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_baf65a1a24467445ecf918e78cf"`);
        await queryRunner.query(`ALTER TABLE "consumer" DROP CONSTRAINT "FK_7c0e24da90f3831cc0f1f25b2a9"`);
        await queryRunner.query(`ALTER TABLE "loan_offer" DROP CONSTRAINT "FK_ce39cb105ca3f07dd3e02232890"`);
        await queryRunner.query(`ALTER TABLE "loan_offer" DROP CONSTRAINT "FK_112395cc7319cfdc5678a8b97ac"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_921582066aa70b502e78ea92012"`);
        await queryRunner.query(`DROP TABLE "application_document"`);
        await queryRunner.query(`DROP TYPE "public"."application_document_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."application_document_doc_type_enum"`);
        await queryRunner.query(`DROP TABLE "underwriting_rule"`);
        await queryRunner.query(`DROP TABLE "underwriting_result"`);
        await queryRunner.query(`DROP TYPE "public"."underwriting_result_decision_enum"`);
        await queryRunner.query(`DROP TABLE "external_check"`);
        await queryRunner.query(`DROP TYPE "public"."external_check_check_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."external_check_check_type_enum"`);
        await queryRunner.query(`DROP TABLE "blacklist"`);
        await queryRunner.query(`DROP TABLE "vendor"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "manual_review"`);
        await queryRunner.query(`DROP TYPE "public"."manual_review_review_status_enum"`);
        await queryRunner.query(`DROP TABLE "loan_application_history"`);
        await queryRunner.query(`DROP TYPE "public"."application_status_enum"`);
        await queryRunner.query(`DROP TABLE "loan_application"`);
        await queryRunner.query(`DROP TYPE "public"."loan_application_status_enum"`);
        await queryRunner.query(`DROP TABLE "consumer"`);
        await queryRunner.query(`DROP TABLE "loan_offer"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
    }

}
