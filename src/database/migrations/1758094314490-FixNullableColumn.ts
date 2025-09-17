import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixNullableColumn1758094314490 implements MigrationInterface {
  name = 'FixNullableColumn1758094314490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "finalPrice" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "finalPrice" SET NOT NULL`,
    );
  }
}
