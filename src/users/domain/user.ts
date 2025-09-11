export class User {
  readonly id: string;

  readonly name: string;

  readonly email: string;

  readonly password: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
