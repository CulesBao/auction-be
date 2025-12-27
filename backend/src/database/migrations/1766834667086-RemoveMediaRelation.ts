import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveMediaRelation1766834667086 implements MigrationInterface {
  name = "RemoveMediaRelation1766834667086";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" ADD "media_ids" uuid array`);
    await queryRunner.query(
      `UPDATE "items" SET "media_ids" = '{}' WHERE "media_ids" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "media_ids" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "media_ids"`);
  }
}
