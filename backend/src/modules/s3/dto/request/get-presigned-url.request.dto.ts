import { Uuid } from "common/types";

export class GetPresignedUrlRequestDto {
  bucket: string;
  userId: Uuid;
  fileName: string;
}
