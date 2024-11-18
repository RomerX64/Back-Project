import { MigrationInterface, QueryRunner } from "typeorm";

export class NewUser1731956059460 implements MigrationInterface {
    name = 'NewUser1731956059460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2f36427dbd354bcd3fa33560484"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "credentialIdId" TO "credentialId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d6d50143a16c49c49bf467ae541" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6d50143a16c49c49bf467ae541"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "credentialId" TO "credentialIdId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2f36427dbd354bcd3fa33560484" FOREIGN KEY ("credentialIdId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
