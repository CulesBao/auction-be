import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SendMailToWinnerCommand } from "../implements/send-mail-to-winner.command";
import { ItemRepository } from "modules/items/repository/item.repository";
import { ItemEntity } from "modules/items/entities/item.entity";
import { QueryBus } from "@nestjs/cqrs";
import { SendMailWithTemplate } from "modules/mail/cqrs/queries/implements/send-mail-with-template.query";
import { DataSource } from "typeorm";
import { Logger } from "@nestjs/common";

@CommandHandler(SendMailToWinnerCommand)
export class SendMailToWinnerCommandHandler
  implements ICommandHandler<SendMailToWinnerCommand>
{
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly queryBus: QueryBus,
    private readonly dataSource: DataSource,
  ) {}

  async execute(_: SendMailToWinnerCommand): Promise<void> {
    const now = new Date();

    const rawItems = await this.itemRepository.findItemsNotNotified(now);

    await Promise.all(
      rawItems.map((rawItem) =>
        this.dataSource.transaction(async (manager) => {
          const item = await manager.getRepository(ItemEntity).findOne({
            where: { id: rawItem.id },
            lock: { mode: "pessimistic_write" },
          });

          if (!item) return;

          const itemWithRelations = await manager
            .getRepository(ItemEntity)
            .findOne({
              where: { id: item.id },
              relations: { owner: true, winner: true },
            });

          if (!itemWithRelations || !itemWithRelations.winner) return;

          this.queryBus.execute(
            new SendMailWithTemplate(
              itemWithRelations.winner.email,
              `Congratulations! You won the auction for "${itemWithRelations.name}"`,
              "notify-to-winner.hbs",
              { ...this.filterData(itemWithRelations) },
            ),
          );

          await manager
            .getRepository(ItemEntity)
            .update(item.id, { isWinnerNotified: true });
        }),
      ),
    );

    Logger.log(`Sent ${rawItems.length} email(s) to winners.`);
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
        name: item.owner.firstName + " " + item.owner.lastName,
      },
      winner: {
        id: item.winner.id,
        email: item.winner.email,
        name: item.winner.firstName + " " + item.winner.lastName,
      },
    };
  }
}
