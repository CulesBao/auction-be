import { ICommand } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class UpdateItemCommand implements ICommand {
  constructor(
    public readonly id: UUID,
    public readonly name: string,
    public readonly description: string,
    public readonly startingPrice: number,
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly ownerId: UUID,
  ) {}
}
