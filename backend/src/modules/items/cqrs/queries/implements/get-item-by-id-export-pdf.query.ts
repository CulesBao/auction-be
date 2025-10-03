import { IQuery } from '@nestjs/cqrs';
import { Uuid } from 'common/types';

export class GetItemByIdExportPdfQuery implements IQuery {
    constructor(public readonly id: Uuid) { }
}