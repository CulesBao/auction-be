import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBidsTable1758187600824 implements MigrationInterface {
  name = 'CreateBidsTable1758187600824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_20f2eb2dc8f89d3d27b862fae10"`,
    );
    await queryRunner.query(
      `CREATE TABLE "bids" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "itemId" uuid NOT NULL, "userId" uuid NOT NULL, "price" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7950d066d322aab3a488ac39fe5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "winnerId"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "finalPrice"`);
    await queryRunner.query(
      `ALTER TABLE "bids" ADD CONSTRAINT "FK_7dfeb7e7415b48ae5e68d2d0791" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bids" ADD CONSTRAINT "FK_1531393fadbf123f3d51c91d819" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bids" DROP CONSTRAINT "FK_1531393fadbf123f3d51c91d819"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bids" DROP CONSTRAINT "FK_7dfeb7e7415b48ae5e68d2d0791"`,
    );
    await queryRunner.query(`ALTER TABLE "items" ADD "finalPrice" numeric`);
    await queryRunner.query(`ALTER TABLE "items" ADD "winnerId" uuid`);
    await queryRunner.query(`DROP TABLE "bids"`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_20f2eb2dc8f89d3d27b862fae10" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
