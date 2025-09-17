import { ICommand } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class CreateItemCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly ownerId: UUID,
    public readonly startingPrice: number,
    public readonly startTime: Date,
    public readonly endTime: Date,
  ) {}
}
