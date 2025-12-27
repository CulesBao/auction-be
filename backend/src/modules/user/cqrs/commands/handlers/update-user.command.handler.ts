import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../implements/update-user.command";
import { UserRepository } from "modules/user/repository/user.repository";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { MediaDto } from "modules/media-service/dto/media.dto";
import { MediaService } from "modules/media-service/media-service.token";

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(MediaService.name)
    private readonly client: ClientProxy,
  ) {}

  async execute(updateUserCommand: UpdateUserCommand): Promise<void> {
    const media = await firstValueFrom(
      this.client.send<MediaDto[]>(MediaService.getByIds, [
        updateUserCommand.avatarId,
      ]),
    );

    await this.userRepository.update({
      ...updateUserCommand.userEntity,
      picture: media[0]?.fileUrl || undefined,
      avatarId: updateUserCommand.avatarId,
      firstName: updateUserCommand.firstName,
      lastName: updateUserCommand.lastName,
      birthday: updateUserCommand.birthday || undefined,
      gender: updateUserCommand.gender || undefined,
      phoneNumber: updateUserCommand.phoneNumber,
    });
  }
}
