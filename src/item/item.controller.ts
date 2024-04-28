import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        author: { type: 'string' },
        price: { type: 'number' },
        fileurl: { type: 'string' },
      },
    },
  })
  @Post()
  async CreateItem(
    @Body()
    body: CreateItemDto,
  ) {
    return this.itemService.CreateItem(body);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        author: { type: 'string' },
        price: { type: 'number' },
        fileurl: { type: 'string' },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Body) {
    return this.itemService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
