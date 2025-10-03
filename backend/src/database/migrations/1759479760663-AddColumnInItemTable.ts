import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnInItemTable1759479760663 implements MigrationInterface {
    name = 'AddColumnInItemTable1759479760663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ADD "is_winner_notified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "is_winner_notified"`);
    }

}
