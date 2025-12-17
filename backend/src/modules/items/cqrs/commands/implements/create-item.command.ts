import { ICommand } from "@nestjs/cqrs";
import { Uuid } from "common/types";

export class CreateItemCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly ownerId: Uuid,
    public readonly startingPrice: number,
    public readonly startTime: Date,
    public readonly endTime: Date,
  ) {}
}
