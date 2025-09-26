import { IQuery } from '@nestjs/cqrs';
import { Uuid } from 'common/types';

export class GetItemsByOwnerIdQuery implements IQuery {
  constructor(public readonly ownerId: Uuid) { }
}
