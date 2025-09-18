export class AuctionTimeVo {
  constructor(
    public readonly startTime: Date,
    public readonly endTime: Date,
  ) {}

  validate(): void {
    const currentDate = new Date();

    if (this.endTime <= currentDate) {
      throw new Error('End time must be in the future');
    }

    if (this.startTime >= this.endTime) {
      throw new Error('Start time must be before end time');
    }
  }
}
