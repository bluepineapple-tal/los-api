import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddressSchema1751977387073 implements MigrationInterface {
    name = 'UpdateAddressSchema1751977387073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "addressCountry"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "addressStreet1"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "addressStreet2"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "addressCity"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "addressState"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "addressPin_code"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "street1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "street2" character varying`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "pin_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "country" character varying NOT NULL DEFAULT 'India'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "pin_code"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "street2"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" DROP COLUMN "street1"`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "addressPin_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "addressState" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "addressCity" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "addressStreet2" character varying`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "addressStreet1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumer_details" ADD "addressCountry" character varying NOT NULL DEFAULT 'India'`);
    }

}
