import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMediaCommand } from "../implements/create-media.command";
import { MediaRepository } from "modules/media/repository/media.repository";
import { MediaAdapterInterface } from "modules/media/interfaces/media-adapter.interface";
import { Media } from "modules/media/domain/media";
import { getFileType } from "utils/file-type.enum";
import { Inject } from "@nestjs/common";
import { MediaAdapterToken } from "modules/media/media.token";

@CommandHandler(CreateMediaCommand)
export class CreateMediaCommandHandler
  implements ICommandHandler<CreateMediaCommand>
{
  constructor(
    private readonly mediaRepository: MediaRepository,
    @Inject(MediaAdapterToken)
    private readonly mediaAdapterInterface: MediaAdapterInterface,
  ) {}

  async execute(command: CreateMediaCommand): Promise<Media> {
    await this.mediaAdapterInterface.fileExists(
      command.bucket,
      command.fileName,
    );

    return Media.fromEntity(
      await this.mediaRepository.create({
        bucket: command.bucket,
        fileName: command.fileName,
        fileType: getFileType(command.fileName),
        fileUrl: this.mediaAdapterInterface.getPublicUrl(
          command.bucket,
          command.fileName,
        ),
      }),
    );
  }
}
