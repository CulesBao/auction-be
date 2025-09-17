import { IQuery } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class GetItemByIdQuery implements IQuery {
  constructor(public readonly id: UUID) {}
}
