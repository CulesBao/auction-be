import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateItemCommand } from "../implements/update-item.command";
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { ItemRepository } from "modules/items/repository/item.repository";
import { MediaRepository } from "modules/media/repository/media.repository";

@CommandHandler(UpdateItemCommand)
export class UpdateItemCommandHandler
  implements ICommandHandler<UpdateItemCommand>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
    @Inject(MediaRepository)
    private readonly mediaRepository: MediaRepository,
  ) {}

  async execute(command: UpdateItemCommand): Promise<void> {
    if (command.startTime >= command.endTime) {
      throw new BadRequestException({
        description: "Start time must be before end time",
      });
    }

    const item = await this.itemRepository.findByIdOrThrow(command.id);

    if (item.ownerId !== command.ownerId) {
      throw new UnauthorizedException({
        description: "You are not the owner of this item",
      });
    }

    const medias = await this.mediaRepository.findByIds(command.mediaIds);

    await this.itemRepository.update({
      ...item,
      name: command.name,
      description: command.description,
      startingPrice: command.startingPrice,
      startTime: command.startTime,
      endTime: command.endTime,
      medias: medias,
    });
  }
}
