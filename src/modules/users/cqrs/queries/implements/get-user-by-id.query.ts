import { IQuery } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class GetUserByIdQuery implements IQuery {
  constructor(public readonly id: UUID) {}
}
