import { CreateMediaCommand } from "../cqrs/commands/implements/create-media.command";
import { CreateMediaRequestDto } from "../dto/request/create-media.request.dto";

export class MediaMapper {
  static fromCreateMediaRequestDto(
    createMediaRequestDto: CreateMediaRequestDto,
  ): CreateMediaCommand {
    return new CreateMediaCommand(
      createMediaRequestDto.bucket,
      createMediaRequestDto.fileName,
    );
  }
}
