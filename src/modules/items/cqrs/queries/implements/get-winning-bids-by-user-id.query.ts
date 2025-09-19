import { IQuery } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class GetWinningBidsByUserIdQuery implements IQuery {
  constructor(public readonly userId: UUID) {}
}
