import { IQuery } from "@nestjs/cqrs";

export class GetItemsByFilterQuery implements IQuery {
  constructor(
    public readonly name: string | undefined,
    public readonly ownerName: string | undefined,
    public readonly startTime: Date | undefined,
    public readonly endTime: Date | undefined,
    public readonly startingPriceFrom: number | undefined,
    public readonly startingPriceTo: number | undefined,
  ) {}
}
