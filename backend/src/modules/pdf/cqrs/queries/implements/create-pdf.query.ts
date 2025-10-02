import { IQuery } from "@nestjs/cqrs";

export class CreatePdfQuery implements IQuery {
    constructor(
        public readonly htmlPath: string,
        public readonly data: Object,
    ) { }
}