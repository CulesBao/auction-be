import { ICommand } from "@nestjs/cqrs";
import { Uuid } from "common/types";

export class CreateMediaCommand implements ICommand {
  constructor(
    public readonly userId: Uuid,
    public readonly fileName: string,
  ) {}
}
