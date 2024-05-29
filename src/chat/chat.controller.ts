import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AdminGuard } from 'src/admin/admin.guard';
import { MentorGuard } from 'src/mentor/mentor.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly socketGateway: ChatGateway,
    private readonly chatService: ChatService,
  ) {}

  @UseGuards(MentorGuard)
  @ApiBearerAuth()
  @Get('mentor')
  @ApiOperation({ summary: 'Get all chats' })
  findAll() {
    return this.chatService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('user')
  @ApiOperation({ summary: 'Get chats by id' })
  findOne(@Request() req: any) {
    return this.chatService.findById(req.userId);
  }
}
