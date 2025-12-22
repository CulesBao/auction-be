import { IQuery } from "@nestjs/cqrs";
import { Uuid } from "common/types";

export class GetPresignedUrlQuery implements IQuery {
  constructor(
    public readonly bucket: string,
    public readonly userId: Uuid,
    public readonly fileName: string,
  ) {}
}
