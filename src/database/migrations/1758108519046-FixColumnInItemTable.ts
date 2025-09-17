import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixColumnInItemTable1758108519046 implements MigrationInterface {
  name = 'FixColumnInItemTable1758108519046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_20f2eb2dc8f89d3d27b862fae10"`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "finalPrice"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "winnerId"`);
    await queryRunner.query(`ALTER TABLE "items" ADD "currentBidderId" uuid`);
    await queryRunner.query(`ALTER TABLE "items" ADD "currentPrice" numeric`);
    await queryRunner.query(`ALTER TABLE "items" ADD "biddedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_89d82a336d6daa2533a66aab108" FOREIGN KEY ("currentBidderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_89d82a336d6daa2533a66aab108"`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "biddedAt"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "currentPrice"`);
    await queryRunner.query(
      `ALTER TABLE "items" DROP COLUMN "currentBidderId"`,
    );
    await queryRunner.query(`ALTER TABLE "items" ADD "winnerId" uuid`);
    await queryRunner.query(`ALTER TABLE "items" ADD "finalPrice" numeric`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_20f2eb2dc8f89d3d27b862fae10" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
