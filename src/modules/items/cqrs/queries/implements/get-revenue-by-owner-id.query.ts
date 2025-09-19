import { IQuery } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class GetRevenueByOwnerIdQuery implements IQuery {
  constructor(
    public readonly ownerId: UUID,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}
