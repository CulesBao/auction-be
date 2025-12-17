import { IQuery } from "@nestjs/cqrs";

export class SendMailWithTemplate implements IQuery {
  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly templateFilePath: string,
    public readonly data: Object,
  ) {}
}
