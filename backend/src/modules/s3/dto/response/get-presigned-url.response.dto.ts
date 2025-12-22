import { Uuid } from "common/types";

export class GetPresignedUrlResponseDto {
  userId: Uuid;
  fileName: string;
  expiredAt: Date;
  presignedUrl: string;
}
