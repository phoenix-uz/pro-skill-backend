import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AdminGuard } from 'src/admin/admin.guard';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly socketGateway: ChatGateway , 
    private readonly chatService: ChatService
  ) {}

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get('chat')
  @ApiOperation({ summary: 'Get all chats' })
  findAll() {
    return this.chatService.findAll();
  }
  
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get chats by id' })
  findOne(@Param('id') id: number) {
    return this.chatService.findById(+id);
  }
 
}
