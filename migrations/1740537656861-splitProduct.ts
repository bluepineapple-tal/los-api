import { MigrationInterface, QueryRunner } from "typeorm";

export class SplitProduct1740537656861 implements MigrationInterface {
    name = 'SplitProduct1740537656861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan_offer" DROP CONSTRAINT "FK_112395cc7319cfdc5678a8b97ac"`);
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_4d8a4dbd947a6973f8a34bd866f"`);
        await queryRunner.query(`ALTER TABLE "loan_offer" RENAME COLUMN "productId" TO "productModelId"`);
        await queryRunner.query(`ALTER TABLE "loan_application" RENAME COLUMN "productId" TO "productModelId"`);
        await queryRunner.query(`CREATE TYPE "public"."product_make_status_enum" AS ENUM('active', 'inactive', 'discontinued')`);
        await queryRunner.query(`CREATE TABLE "product_make" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "status" "public"."product_make_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16fdb72e001502bbb4fe4be3155" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_model_status_enum" AS ENUM('active', 'inactive', 'discontinued')`);
        await queryRunner.query(`CREATE TABLE "product_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "price" numeric(12,2) NOT NULL, "status" "public"."product_model_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "make_id" uuid, CONSTRAINT "PK_deef06ea1075a8678683d25c718" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loan_offer" ADD CONSTRAINT "FK_d83d702d1ca094bdf26639800a6" FOREIGN KEY ("productModelId") REFERENCES "product_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_model" ADD CONSTRAINT "FK_3ee0942af4f052802386351fd33" FOREIGN KEY ("make_id") REFERENCES "product_make"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_00c9abbdf3687d1bf0e6e23b5b9" FOREIGN KEY ("productModelId") REFERENCES "product_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan_application" DROP CONSTRAINT "FK_00c9abbdf3687d1bf0e6e23b5b9"`);
        await queryRunner.query(`ALTER TABLE "product_model" DROP CONSTRAINT "FK_3ee0942af4f052802386351fd33"`);
        await queryRunner.query(`ALTER TABLE "loan_offer" DROP CONSTRAINT "FK_d83d702d1ca094bdf26639800a6"`);
        await queryRunner.query(`DROP TABLE "product_model"`);
        await queryRunner.query(`DROP TYPE "public"."product_model_status_enum"`);
        await queryRunner.query(`DROP TABLE "product_make"`);
        await queryRunner.query(`DROP TYPE "public"."product_make_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan_application" RENAME COLUMN "productModelId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "loan_offer" RENAME COLUMN "productModelId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "loan_application" ADD CONSTRAINT "FK_4d8a4dbd947a6973f8a34bd866f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_offer" ADD CONSTRAINT "FK_112395cc7319cfdc5678a8b97ac" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
