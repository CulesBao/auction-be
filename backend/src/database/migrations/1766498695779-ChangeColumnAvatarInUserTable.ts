import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnAvatarInUserTable1766498695779
  implements MigrationInterface
{
  name = "ChangeColumnAvatarInUserTable1766498695779";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "avatar_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "medias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_id"`);
  }
}
