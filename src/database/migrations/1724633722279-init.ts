import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1724633722279 implements MigrationInterface {
    name = 'Init1724633722279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_33e6399d4c7cedd12806d5d4dd7" UNIQUE ("name"), CONSTRAINT "PK_098dbeb7c803dc7c08a7f02b805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."farmers_document_type_enum" AS ENUM('CPF', 'CNPJ')`);
        await queryRunner.query(`CREATE TABLE "farmers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "document" character varying(20) NOT NULL, "document_type" "public"."farmers_document_type_enum" NOT NULL, "name" character varying(255) NOT NULL, "farm_name" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(2) NOT NULL, "total_area" numeric NOT NULL, "arable_area" numeric NOT NULL, "vegetation_area" numeric NOT NULL, CONSTRAINT "PK_ccbe91e5e64dde1329b4c153637" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farm_crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "farmer_id" uuid NOT NULL, "crop_id" uuid NOT NULL, CONSTRAINT "UQ_5129c7708f1aaa6cedb207332fd" UNIQUE ("farmer_id", "crop_id"), CONSTRAINT "PK_557d16ea67cff31467d269c1608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "farm_crops" ADD CONSTRAINT "FK_042a68b1c5e08fef2f42332833d" FOREIGN KEY ("farmer_id") REFERENCES "farmers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farm_crops" ADD CONSTRAINT "FK_151b00e0c805980ed67324a54e4" FOREIGN KEY ("crop_id") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm_crops" DROP CONSTRAINT "FK_151b00e0c805980ed67324a54e4"`);
        await queryRunner.query(`ALTER TABLE "farm_crops" DROP CONSTRAINT "FK_042a68b1c5e08fef2f42332833d"`);
        await queryRunner.query(`DROP TABLE "farm_crops"`);
        await queryRunner.query(`DROP TABLE "farmers"`);
        await queryRunner.query(`DROP TYPE "public"."farmers_document_type_enum"`);
        await queryRunner.query(`DROP TABLE "crops"`);
    }

}
