import { Uuid } from "common/types";

export class Item {
  readonly id: Uuid;

  readonly name: string;

  readonly description: string;

  readonly ownerId: Uuid;

  readonly startingPrice: number;

  readonly startTime: Date;

  readonly endTime: Date;

  readonly winnerId: Uuid | null;

  readonly finalPrice: number | null;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
