import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnMediaInItemTable1766738655555
  implements MigrationInterface
{
  name = "AddColumnMediaInItemTable1766738655555";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item_medias" ("items_id" uuid NOT NULL, "medias_id" uuid NOT NULL, CONSTRAINT "PK_e70c0eab9c6f01d3e0199f9abf4" PRIMARY KEY ("items_id", "medias_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da76c10cc12fa9ac3ebb3c28fd" ON "item_medias" ("items_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43bcc4888165134f6459e5c65b" ON "item_medias" ("medias_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "item_medias" ADD CONSTRAINT "FK_da76c10cc12fa9ac3ebb3c28fd6" FOREIGN KEY ("items_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_medias" ADD CONSTRAINT "FK_43bcc4888165134f6459e5c65bd" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_medias" DROP CONSTRAINT "FK_43bcc4888165134f6459e5c65bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_medias" DROP CONSTRAINT "FK_da76c10cc12fa9ac3ebb3c28fd6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_43bcc4888165134f6459e5c65b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da76c10cc12fa9ac3ebb3c28fd"`,
    );
    await queryRunner.query(`DROP TABLE "item_medias"`);
  }
}
