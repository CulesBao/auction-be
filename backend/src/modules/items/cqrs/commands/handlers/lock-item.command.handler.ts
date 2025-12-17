import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LockItemCommand } from "../implements/lock-item.command";
import { ItemRepository } from "modules/items/repository/item.repository";
import { ForbiddenException } from "@nestjs/common";

@CommandHandler(LockItemCommand)
export class LockItemCommandHandler
  implements ICommandHandler<LockItemCommand>
{
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(command: LockItemCommand): Promise<void> {
    const item = await this.itemRepository.findByIdOrThrow(command.id);

    if (item.ownerId !== command.userId) {
      throw new ForbiddenException({
        description: "You are not the owner of this item.",
      });
    }

    const now = new Date();

    if (item.startTime > now) {
      throw new ForbiddenException({
        description: "Item auction has not started yet.",
      });
    }

    if (item.endTime <= now) {
      throw new ForbiddenException({
        description: "Item auction has already ended.",
      });
    }

    item.endTime = now;

    await this.itemRepository.create(item);
  }
}
