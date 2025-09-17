import { IQuery } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class GetItemsByOwnerIdQuery implements IQuery {
  constructor(public readonly ownerId: UUID) {}
}
