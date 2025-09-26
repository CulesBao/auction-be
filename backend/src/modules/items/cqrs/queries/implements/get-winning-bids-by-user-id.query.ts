import { IQuery } from '@nestjs/cqrs';
import { Uuid } from 'common/types';

export class GetWinningBidsByUserIdQuery implements IQuery {
  constructor(public readonly userId: Uuid) { }
}
