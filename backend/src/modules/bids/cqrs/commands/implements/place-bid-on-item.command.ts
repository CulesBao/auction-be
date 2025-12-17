import { ICommand } from "@nestjs/cqrs";
import { Uuid } from "common/types";

export class PlaceBidOnItemCommand implements ICommand {
  constructor(
    public readonly itemId: Uuid,
    public readonly userId: Uuid,
    public readonly price: number,
  ) {}
}
