import { IQuery } from "@nestjs/cqrs";
import { Uuid } from "common/types";

export class GetStatisticByUserIdQuery implements IQuery {
  constructor(
    public readonly userId: Uuid,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}
