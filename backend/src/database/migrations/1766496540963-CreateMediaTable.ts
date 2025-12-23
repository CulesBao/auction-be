import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMediaTable1766496540963 implements MigrationInterface {
  name = "CreateMediaTable1766496540963";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."medias_file_type_enum" AS ENUM('image', 'video', 'pdf', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_type" "public"."medias_file_type_enum" NOT NULL, "file_name" character varying NOT NULL, "file_url" character varying NOT NULL, CONSTRAINT "PK_f27321557a66cd4fae9bc1ed6e7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "medias"`);
    await queryRunner.query(`DROP TYPE "public"."medias_file_type_enum"`);
  }
}
