import { MigrationInterface, QueryRunner } from "typeorm";

export class Adsadsadsa1732129021628 implements MigrationInterface {
    name = 'Adsadsadsa1732129021628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9c16681cbfc2d83eb6b2b9843e9"`);
        await queryRunner.query(`CREATE TABLE "details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_02185da47c073158a934d3927dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9c16681cbfc2d83eb6b2b9843e9" FOREIGN KEY ("detailId") REFERENCES "details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9c16681cbfc2d83eb6b2b9843e9"`);
        await queryRunner.query(`DROP TABLE "details"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9c16681cbfc2d83eb6b2b9843e9" FOREIGN KEY ("detailId") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
