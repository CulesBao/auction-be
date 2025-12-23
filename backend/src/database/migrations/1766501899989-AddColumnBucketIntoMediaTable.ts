import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnBucketIntoMediaTable1766501899989
  implements MigrationInterface
{
  name = "AddColumnBucketIntoMediaTable1766501899989";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medias" ADD "bucket" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "bucket"`);
  }
}
