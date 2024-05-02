import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { MentorGuard } from 'src/mentor/mentor.guad';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @ApiTags('Mentor')
  @UseGuards(MentorGuard)
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
      },
    },
  })
  @Post()
  async addNews(
    @Body()
    body: CreateMessageDto,
  ) {
    return this.messageService.create(body);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }
}
