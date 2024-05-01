import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        text:{type:'string'},
        
      }
    }
  })
  @Post()
  async addNews(
    @Body()
    body: CreateMessageDto,
  ) 
  {
    return this.messageService.create(body);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  
}
