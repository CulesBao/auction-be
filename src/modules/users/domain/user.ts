import { UUID } from 'crypto';

export class User {
  readonly id: UUID;

  readonly name: string;

  readonly email: string;

  readonly password: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
