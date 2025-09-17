import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateItemDto } from './dto/request/create-item.request.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsMapper } from './mapper/items.mapper';
import { GetItemByIdResponseDto } from './dto/response/get-item-by-id.response.dto';
import { UUID } from 'crypto';
import { GetItemByIdQuery } from './cqrs/queries/implements/get-item-by-id.query';
import { GetItemsByOwnerIdQuery } from './cqrs/queries/implements/get-items-by-owner-id.query';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.commandBus.execute(
      ItemsMapper.fromCreateItemDto(createItemDto),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully retrieved.',
    type: GetItemByIdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  getItemById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.queryBus.execute(new GetItemByIdQuery(id));
  }

  @Get('owner/:ownerId')
  @ApiOperation({ summary: 'Get items by owner ID' })
  @ApiResponse({
    status: 200,
    description: 'The items have been successfully retrieved.',
    type: [GetItemByIdResponseDto],
  })
  getItemsByOwnerId(@Param('ownerId', ParseUUIDPipe) ownerId: UUID) {
    return this.queryBus.execute(new GetItemsByOwnerIdQuery(ownerId));
  }
}
