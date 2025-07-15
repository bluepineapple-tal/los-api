import { MigrationInterface, QueryRunner } from "typeorm";

export class ExternalCheckStatusToVarchar1752614921445 implements MigrationInterface {
    name = 'ExternalCheckStatusToVarchar1752614921445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_check" DROP COLUMN "check_status"`);
        await queryRunner.query(`DROP TYPE "public"."external_check_check_status_enum"`);
        await queryRunner.query(`ALTER TABLE "external_check" ADD "check_status" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_check" DROP COLUMN "check_status"`);
        await queryRunner.query(`CREATE TYPE "public"."external_check_check_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`ALTER TABLE "external_check" ADD "check_status" "public"."external_check_check_status_enum" NOT NULL DEFAULT 'pending'`);
    }

}
