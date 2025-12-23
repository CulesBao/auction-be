import { ApiProperty } from "@nestjs/swagger";
import { Uuid } from "common/types";
import { Media } from "modules/media/domain/media";

export class CreateMediaResponseDto {
  @ApiProperty({
    description: "Unique identifier of the media",
    example: "550e8400-e29b-41d4-a716-446655440000",
    format: "uuid",
  })
  id: Uuid;

  @ApiProperty({
    example: "http://example.com/media/image.png",
    format: "url",
    description: "URL of the created media file",
  })
  fileUrl: string;

  @ApiProperty({
    example: "2023-10-05T14:48:00.000Z",
    description: "Timestamp when the media was created",
    format: "date-time",
  })
  createdAt: Date;

  @ApiProperty({
    example: "2023-10-05T14:48:00.000Z",
    description: "Timestamp when the media was last updated",
    format: "date-time",
  })
  updatedAt: Date;

  static fromDomain(media: Media): CreateMediaResponseDto {
    return {
      id: media.id,
      fileUrl: media.fileUrl,
      createdAt: media.createdAt,
      updatedAt: media.updatedAt,
    };
  }
}
