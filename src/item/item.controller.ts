import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

@ApiBody({
  schema:{
    type:'object',
    properties:{
      title:{type:'string'},
      subtitle: {type:'string'},
      author: {type:'string'},
      price:{type:'number'},
      fileurl:{type:'string'}
    }
  }
})

  @Post('add')
  async CreateItem(
    @Body() 
    body: CreateItemDto,
  )
  {
    return this.itemService.CreateItem(body);
  }
  
  @Get()
  findAll() {
    return this.itemService.findAll();
  }
  
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        title:{type:'string'},
        subtitle: {type:'string'},
        author: {type:'string'},
        price:{type:'number'},
        fileurl:{type:'string'}
      }
    }
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
