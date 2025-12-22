import { Uuid } from "common/types";

export class GetPresignedUrl {
  constructor(
    public readonly userId: Uuid,
    public readonly fileName: string,
    public readonly expiredAt: Date,
    public readonly presignedUrl: string,
  ) {}
}
