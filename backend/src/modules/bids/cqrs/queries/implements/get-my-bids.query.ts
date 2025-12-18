import { IQuery } from "@nestjs/cqrs";
import { Uuid } from "common/types";

export class GetMyBidsQuery implements IQuery {
  constructor(public readonly userId: Uuid) {}
}
