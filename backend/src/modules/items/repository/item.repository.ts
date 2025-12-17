import { InjectRepository } from "@nestjs/typeorm";
import { ItemEntity } from "../entities/item.entity";
import { DataSource, IsNull, LessThan, Like, Not, Repository } from "typeorm";
import { Uuid } from "common/types";
import { NotFoundException } from "@nestjs/common";
import { MoreThanOrEqual, LessThanOrEqual } from "typeorm";

export class ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(item: Partial<ItemEntity>): Promise<ItemEntity> {
    return await this.itemRepository.save(this.itemRepository.create(item));
  }

  async findById(id: Uuid): Promise<ItemEntity | null> {
    return await this.itemRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: Uuid): Promise<ItemEntity> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException({
        description: `Item with ID ${id} not found.`,
      });
    }

    return item;
  }

  async findByIdWithRelationsOrThrow(id: Uuid): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        winner: true,
        bids: {
          user: true,
        },
      },
    });

    if (!item) {
      throw new NotFoundException({
        description: `Item with ID ${id} not found.`,
      });
    }

    return item;
  }

  async findByOwnerId(ownerId: Uuid): Promise<ItemEntity[]> {
    return await this.itemRepository.find({
      where: { ownerId },
      relations: {
        bids: true,
      },
    });
  }

  async update(id: Uuid, updateData: Partial<ItemEntity>): Promise<void> {
    await this.itemRepository.update(id, updateData);
  }

  async findNonBiddedItems(
    name: string | undefined,
    startingPriceFrom: number | undefined,
    startingPriceTo: number | undefined,
  ): Promise<ItemEntity[]> {
    return await this.itemRepository.findBy({
      name: name ? Like(`%${name}%`) : undefined,
      startingPrice:
        startingPriceFrom && startingPriceTo
          ? MoreThanOrEqual(startingPriceFrom) &&
            LessThanOrEqual(startingPriceTo)
          : startingPriceFrom
            ? MoreThanOrEqual(startingPriceFrom)
            : startingPriceTo
              ? LessThanOrEqual(startingPriceTo)
              : undefined,
      winnerId: IsNull(),
      finalPrice: IsNull(),
    });
  }

  async findItemsByFilter(
    name: string | undefined,
    ownerName: string | undefined,
    startTime: Date | undefined,
    endTime: Date | undefined,
    startingPriceFrom: number | undefined,
    startingPriceTo: number | undefined,
  ): Promise<ItemEntity[]> {
    return await this.itemRepository.find({
      where: {
        name: name ? Like(`%${name}%`) : undefined,
        owner: ownerName
          ? [
              { firstName: Like(`%${ownerName}%`) },
              { lastName: Like(`%${ownerName}%`) },
            ]
          : undefined,
        startTime: startTime ? MoreThanOrEqual(startTime) : undefined,
        endTime: endTime ? LessThanOrEqual(endTime) : undefined,
        startingPrice:
          startingPriceFrom && startingPriceTo
            ? MoreThanOrEqual(startingPriceFrom) &&
              LessThanOrEqual(startingPriceTo)
            : startingPriceFrom
              ? MoreThanOrEqual(startingPriceFrom)
              : startingPriceTo
                ? LessThanOrEqual(startingPriceTo)
                : undefined,
      },
      relations: {
        owner: true,
        winner: true,
      },
    });
  }

  async findItemsNotNotified(endTime: Date): Promise<ItemEntity[]> {
    return await this.itemRepository.findBy({
      endTime: LessThanOrEqual(endTime),
      winnerId: Not(IsNull()),
      isWinnerNotified: false,
    });
  }

  async findWinningBidsByUserId(userId: Uuid): Promise<ItemEntity[]> {
    return await this.itemRepository.findBy({
      winnerId: userId,
      endTime: LessThan(new Date()),
    });
  }

  async getRevenueByOwnerId(
    ownerId: Uuid,
    startDate: Date,
    endDate: Date,
  ): Promise<number | null> {
    const revenue: number | null = await this.dataSource
      .getRepository(ItemEntity)
      .createQueryBuilder("item")
      .select("SUM(item.finalPrice)", "revenue")
      .where("item.ownerId = :ownerId", { ownerId })
      .andWhere("item.endTime BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .andWhere("item.finalPrice IS NOT NULL")
      .getRawOne<{ revenue: string | null }>()
      .then(
        (
          result:
            | {
                revenue: string | null;
              }
            | undefined,
        ) => {
          if (result && result.revenue !== null) {
            return parseFloat(result.revenue);
          }
          return null;
        },
      );

    return revenue;
  }
}
