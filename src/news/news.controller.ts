import { Controller, Get, Post, Body, Patch, Param, Delete,  } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        title:{type:'string'},
        description: {type:'string'},
        photoUrl: {type:'string'},
        mainUrl:{type:'string'}
      }
    }
  })

  @Post()
  async addNews(
    @Body()
    body: CreateNewsDto,
  ) 
  {
    return this.newsService.create(body);
  }
  
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

@ApiBody({
    schema:{
      type:'object',
      properties:{
        title:{type:'string'},
        description: {type:'string'},
        photoUrl: {type:'string'},
        mainUrl:{type:'string'}
      }
    }
  })

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Body) {
    return this.newsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
