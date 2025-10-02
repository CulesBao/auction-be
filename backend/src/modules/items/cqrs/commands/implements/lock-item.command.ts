import { ICommand } from "@nestjs/cqrs";
import { Uuid } from "common/types";

export class LockItemCommand implements ICommand {
    constructor(
        public readonly id: Uuid,
        public readonly userId: Uuid
    ) { }
}