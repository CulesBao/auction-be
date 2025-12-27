import { Uuid } from "common/types";

export class MediaDto {
  id: Uuid;
  fileName: string;
  fileUrl: string;
}
