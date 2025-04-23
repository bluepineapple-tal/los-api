import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductCategories1745396991050 implements MigrationInterface {
    name = 'CreateProductCategories1745396991050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_0ba347cced47e2bd9e726acb5e1"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_00c9abbdf3687d1bf0e6e23b5b9"`);
        await queryRunner.query(`CREATE TYPE "public"."product_category_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "product_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, "status" "public"."product_category_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loan_offer" DROP COLUMN "productModelId"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP COLUMN "productModelId"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP COLUMN "loanOfferId"`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD "product_category_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "UQ_8ecf52664149a799532b7b0b7e5" UNIQUE ("product_category_id")`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD "selectedOfferId" uuid`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_8ecf52664149a799532b7b0b7e5" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_57529e4219aaaf0d2396bfe6347" FOREIGN KEY ("selectedOfferId") REFERENCES "loan_offer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_57529e4219aaaf0d2396bfe6347"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_8ecf52664149a799532b7b0b7e5"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP COLUMN "selectedOfferId"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "UQ_8ecf52664149a799532b7b0b7e5"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP COLUMN "product_category_id"`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD "loanOfferId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD "productModelId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan_offer" ADD "productModelId" uuid`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TYPE "public"."product_category_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_00c9abbdf3687d1bf0e6e23b5b9" FOREIGN KEY ("productModelId") REFERENCES "product_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_0ba347cced47e2bd9e726acb5e1" FOREIGN KEY ("loanOfferId") REFERENCES "loan_offer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
