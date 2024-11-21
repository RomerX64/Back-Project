import { MigrationInterface, QueryRunner } from "typeorm";

export class Anfdjnafon1732209727616 implements MigrationInterface {
    name = 'Anfdjnafon1732209727616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_8d3a07b8e994962efe57ebd0f2" UNIQUE ("userId"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_02185da47c073158a934d3927dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "userId" uuid, "detailId" uuid, CONSTRAINT "REL_9c16681cbfc2d83eb6b2b9843e" UNIQUE ("detailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" integer NOT NULL, "country" character varying, "city" character varying, "credentialId" uuid, CONSTRAINT "REL_d6d50143a16c49c49bf467ae54" UNIQUE ("credentialId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_categories_categories" ("productsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_8fd95511a998d598ff66d500933" PRIMARY KEY ("productsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_40e7da0284a5389344605de8da" ON "products_categories_categories" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1d833224b5be535323207473f" ON "products_categories_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE TABLE "details_products_products" ("detailsId" uuid NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_aa4c3872908e0f99d0dffed2150" PRIMARY KEY ("detailsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d3f12d6248821dd5c47bc3f68" ON "details_products_products" ("detailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f5bc11d90fa6bf3767aedb200b" ON "details_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9c16681cbfc2d83eb6b2b9843e9" FOREIGN KEY ("detailId") REFERENCES "details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d6d50143a16c49c49bf467ae541" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_40e7da0284a5389344605de8dab" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_e1d833224b5be535323207473f1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "details_products_products" ADD CONSTRAINT "FK_5d3f12d6248821dd5c47bc3f683" FOREIGN KEY ("detailsId") REFERENCES "details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "details_products_products" ADD CONSTRAINT "FK_f5bc11d90fa6bf3767aedb200be" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "details_products_products" DROP CONSTRAINT "FK_f5bc11d90fa6bf3767aedb200be"`);
        await queryRunner.query(`ALTER TABLE "details_products_products" DROP CONSTRAINT "FK_5d3f12d6248821dd5c47bc3f683"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_e1d833224b5be535323207473f1"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_40e7da0284a5389344605de8dab"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6d50143a16c49c49bf467ae541"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9c16681cbfc2d83eb6b2b9843e9"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f5bc11d90fa6bf3767aedb200b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d3f12d6248821dd5c47bc3f68"`);
        await queryRunner.query(`DROP TABLE "details_products_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1d833224b5be535323207473f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40e7da0284a5389344605de8da"`);
        await queryRunner.query(`DROP TABLE "products_categories_categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "details"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
    }

}
