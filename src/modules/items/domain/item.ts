import { UUID } from 'crypto';

export class Item {
  readonly id: UUID;

  readonly name: string;

  readonly description: string;

  readonly ownerId: UUID;

  readonly startingPrice: number;

  readonly startTime: Date;

  readonly endTime: Date;

  readonly winnerId: UUID | null;

  readonly finalPrice: number | null;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
