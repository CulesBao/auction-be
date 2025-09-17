import { UUID } from 'crypto';

export class Item {
  readonly id: UUID;

  readonly name: string;

  readonly description: string;

  readonly ownerId: UUID;

  readonly startingPrice: number;

  readonly startTime: Date;

  readonly endTime: Date;

  readonly currentPrice: number | null;

  readonly currentBidderId: UUID | null;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
