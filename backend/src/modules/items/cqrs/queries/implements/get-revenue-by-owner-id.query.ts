import { IQuery } from "@nestjs/cqrs";
import { Uuid } from "common/types";

export class GetRevenueByOwnerIdQuery implements IQuery {
  constructor(
    public readonly ownerId: Uuid,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}
