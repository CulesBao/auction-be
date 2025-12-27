import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteMediaRelation1766833795604 implements MigrationInterface {
  name = "DeleteMediaRelation1766833795604";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "medias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
