import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../implements/update-user.command";
import { UserRepository } from "modules/user/repository/user.repository";
import { MediaRepository } from "modules/media/repository/media.repository";

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mediaRepository: MediaRepository,
  ) { }

  async execute(updateUserCommand: UpdateUserCommand): Promise<void> {
    const mediaEntity = updateUserCommand.avatarId
      ? await this.mediaRepository.findByIdOrThrow(updateUserCommand.avatarId)
      : null;

    await this.userRepository.update({
      ...updateUserCommand.userEntity,
      avatar: mediaEntity,
      picture: mediaEntity?.fileUrl || undefined,
      avatarId: mediaEntity?.id || null,
      firstName: updateUserCommand.firstName,
      lastName: updateUserCommand.lastName,
      birthday: updateUserCommand.birthday || undefined,
      gender: updateUserCommand.gender || undefined,
      phoneNumber: updateUserCommand.phoneNumber,
    });
  }
}
