import { ICommand } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class PlaceBidOnItemCommand implements ICommand {
  constructor(
    public readonly itemId: UUID,
    public readonly userId: UUID,
    public readonly price: number,
  ) {}
}
