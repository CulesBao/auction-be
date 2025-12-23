import { ICommand } from "@nestjs/cqrs";

export class CreateMediaCommand implements ICommand {
  constructor(
    public readonly bucket: string,
    public readonly fileName: string,
  ) {}
}
