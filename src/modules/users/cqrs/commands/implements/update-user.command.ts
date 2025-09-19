import { ICommand } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: UUID,
    public readonly name: string,
    public readonly password?: string,
  ) {}
}
