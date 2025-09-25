export class Bid {
  constructor(
    public readonly itemId: string,

    public readonly userId: string,

    public readonly price: number,

    public readonly createdAt: Date,
  ) {}
}
