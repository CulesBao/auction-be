import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ItemRepository } from "../repository/item.repository";
import { ItemEntity } from "../entities/item.entity";
import { QueryBus } from "@nestjs/cqrs";
import { SendMailWithTemplate } from "modules/mail/cqrs/queries/implements/send-mail-with-template.query";
import { DataSource } from "typeorm";

@Injectable()
export class SendMailToWinnerSchedule {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly queryBus: QueryBus,
        private readonly dataSource: DataSource,
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        const now = new Date();

        const rawItems = await this.itemRepository.findItemsNotNotified(now);

        for (const rawItem of rawItems) {
            await this.dataSource.transaction(async () => {
                const item = await this.itemRepository.findByIdWithRelationsOrThrow(rawItem.id);

                await this.queryBus.execute(new SendMailWithTemplate(
                    item.winner.email,
                    `Congratulations! You won the auction for "${item.name}"`,
                    'notify-to-winner.hbs',
                    { ...this.filterData(item) }
                ));

                await this.itemRepository.update(item.id, { isWinnerNotified: true });
            });
        }

        console.log(`[${now.toISOString()}] Sent ${rawItems.length} email(s) to winners.`);
    }

    private filterData(item: ItemEntity) {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            startTime: item.startTime,
            endTime: item.endTime,
            startingPrice: item.startingPrice,
            owner: {
                id: item.owner.id,
                email: item.owner.email,
                name: item.owner.firstName + ' ' + item.owner.lastName
            },
            winner: {
                id: item.winner.id,
                email: item.winner.email,
                name: item.winner.firstName + ' ' + item.winner.lastName
            }
        }
    }
}