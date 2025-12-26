import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateItemCommand } from "../implements/create-item.command";
import { BadRequestException, Inject } from "@nestjs/common";
import { ItemRepository } from "modules/items/repository/item.repository";
import { UserRepository } from "modules/user/repository/user.repository";
import { MediaRepository } from "modules/media/repository/media.repository";

@CommandHandler(CreateItemCommand)
export class CreateItemCommandHandler
  implements ICommandHandler<CreateItemCommand>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(MediaRepository)
    private readonly mediaRepository: MediaRepository,
  ) {}

  async execute(command: CreateItemCommand): Promise<void> {
    if (command.startTime >= command.endTime) {
      throw new BadRequestException({
        description: "Start time must be before end time",
      });
    }

    const user = await this.userRepository.findByIdOrThrow(command.ownerId);
    const mediaEntities = await this.mediaRepository.findByIds(
      command.mediaIds,
    );

    await this.itemRepository.create({
      ...command,
      owner: user,
      medias: mediaEntities,
    });
  }
}
