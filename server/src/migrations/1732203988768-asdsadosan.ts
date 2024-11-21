import { MigrationInterface, QueryRunner } from "typeorm";

export class Asdsadosan1732203988768 implements MigrationInterface {
    name = 'Asdsadosan1732203988768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_8d3a07b8e994962efe57ebd0f2" UNIQUE ("userId"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" integer NOT NULL, "country" character varying, "city" character varying, "credentialId" uuid, CONSTRAINT "REL_d6d50143a16c49c49bf467ae54" UNIQUE ("credentialId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "userId" uuid, "detailId" uuid, CONSTRAINT "REL_9c16681cbfc2d83eb6b2b9843e" UNIQUE ("detailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_02185da47c073158a934d3927dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d6d50143a16c49c49bf467ae541" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9c16681cbfc2d83eb6b2b9843e9" FOREIGN KEY ("detailId") REFERENCES "details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9c16681cbfc2d83eb6b2b9843e9"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6d50143a16c49c49bf467ae541"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "details"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
