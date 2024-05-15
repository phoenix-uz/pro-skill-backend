import { Controller, Post, Body } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Controller('chat')
export class ChatController {
  constructor(private readonly socketGateway: ChatGateway) {}
}
