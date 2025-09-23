import { ForbiddenException } from '@nestjs/common';
import { UUID } from 'crypto';

export class BidDomainValidation {
  static ensureBiddingPeriodValid(startTime: Date, endTime: Date) {
    const now = new Date();
    if (endTime < now)
      throw new ForbiddenException(`Bidding period for item has ended.`);
    if (startTime > now)
      throw new ForbiddenException(
        `Bidding period for item has not started yet.`,
      );
  }

  static ensureNotOwner(ownerId: UUID, userId: UUID) {
    if (ownerId === userId)
      throw new ForbiddenException(
        `Item owners cannot place bids on their own items.`,
      );
  }

  static ensureBidPriceValid(
    price: number,
    startingPrice: number,
    highestBid: number | undefined,
  ) {
    if (highestBid && price <= highestBid)
      throw new ForbiddenException(
        `Bid price must be higher than the current highest bid of ${highestBid}.`,
      );
    if (price <= startingPrice)
      throw new ForbiddenException(
        `Bid price must be higher than the starting price of ${startingPrice}.`,
      );
  }
}
