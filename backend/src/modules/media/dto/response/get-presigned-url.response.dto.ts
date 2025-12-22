import { ApiProperty } from "@nestjs/swagger";
import { Uuid } from "common/types";
import { GetPresignedUrl } from "modules/media/domain/get-presigned-url";

export class GetPresignedUrlResponseDto {
  @ApiProperty({
    description: "The presigned URL for accessing the media resource.",
    example:
      "https://example-bucket.s3.amazonaws.com/media/12345?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=EXAMPLECREDENTIAL&X-Amz-Date=20240601T000000Z&X-Amz-Expires=3600&X-Amz-Signature=EXAMPLESIGNATURE&X-Amz-SignedHeaders=host",
  })
  presignedUrl: string;

  @ApiProperty({
    description: "The name of the media file.",
    example: "video.mp4",
  })
  fileName: string;

  @ApiProperty({
    description: "The ID of the user who owns the media file.",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  userId: Uuid;

  @ApiProperty({
    description: "The expiration date and time of the presigned URL.",
    example: "2024-06-01T01:00:00.000Z",
  })
  expiredAt: Date;

  static fromDomain(
    getPresignedUrl: GetPresignedUrl,
  ): GetPresignedUrlResponseDto {
    return {
      presignedUrl: getPresignedUrl.presignedUrl,
      fileName: getPresignedUrl.fileName,
      userId: getPresignedUrl.userId,
      expiredAt: getPresignedUrl.expiredAt,
    };
  }
}
