import { ICommand } from '@nestjs/cqrs';
import { Uuid } from 'common/types';

export class UpdateItemCommand implements ICommand {
  constructor(
    public readonly id: Uuid,
    public readonly name: string,
    public readonly description: string,
    public readonly startingPrice: number,
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly ownerId: Uuid,
  ) { }
}
