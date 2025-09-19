import { IQuery } from '@nestjs/cqrs';

export class GetNonBiddedItemsQuery implements IQuery {
  constructor(
    public readonly name: string | undefined,
    public readonly startingPriceFrom: number | undefined,
    public readonly startingPriceTo: number | undefined,
  ) {}
}
