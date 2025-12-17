import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { PlaceBidOnItemRequestDto } from "./dto/request/place-bid-on-item.request.dto";
import { CommandBus } from "@nestjs/cqrs";
import { BidMapper } from "./mapper/bid.mapper";
import { RequireLoggedIn } from "guards/role-container";
import { AuthUser } from "decorator/auth-user.decorator";
import { UserEntity } from "modules/user/entities/user.entity";

@Controller("bids")
@ApiTags("Bids")
export class BidsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: "Place a bid on an item" })
  @ApiResponse({ status: 201, description: "Bid placed successfully." })
  @ApiResponse({ status: 400, description: "Invalid input data." })
  @ApiResponse({ status: 404, description: "User or Item not found." })
  @ApiResponse({
    status: 403,
    description: "Bidding not allowed due to business rules.",
  })
  @RequireLoggedIn()
  @ApiBearerAuth()
  async placeBid(
    @Body() body: PlaceBidOnItemRequestDto,
    @AuthUser() user: UserEntity,
  ) {
    await this.commandBus.execute(
      BidMapper.fromPlaceBidOnItemRequestDto(body, user.id),
    );
  }
}
