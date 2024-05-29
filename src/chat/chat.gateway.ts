import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private connectedUsers: Map<any, any> = new Map(); // Map для хранения подключенных клиентов
  private mentorClient: Socket; // Хранение сокета ментора

  splitToken(token) {
    const [type, splitedToken] = token.split(' ');
    return type === 'Bearer' ? splitedToken : undefined;
  }

  async checkIsMentor(token) {
    const splitedToken = this.splitToken(token);
    if (!splitedToken) {
      return false;
    }
    const payload = await this.jwtService.verifyAsync(splitedToken, {
      secret: process.env.JWT_SECRET,
    });
    try {
      if (payload.name === process.env.MENTOR_NAME) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  async getUserId(token) {
    const splitedToken = this.splitToken(token);
    const payload = await this.jwtService.verifyAsync(splitedToken, {
      secret: process.env.JWT_SECRET,
    });
    return payload.sub;
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;
    const isMentor = await this.checkIsMentor(token);

    if (!isMentor) {
      const userId = await this.getUserId(token);
      await this.prisma.user.update({
        where: { id: userId },
        data: { online: true },
      });
      console.log(`User connected: ${userId}`);
      this.connectedUsers.set(userId.toString(), { socket: client }); // Сохранение клиента в карте
    } else {
      this.mentorClient = client;
      console.log('Mentor connected');
    }
  }

  async handleDisconnect(client: Socket) {
    const token = client.handshake.headers.authorization;
    const isMentor = await this.checkIsMentor(token);

    if (!isMentor) {
      const userId = await this.getUserId(token);
      await this.prisma.user.update({
        where: { id: userId },
        data: { online: false },
      });
      this.connectedUsers.delete(userId.toString()); // Удаление клиента из карты
      console.log(`User disconnected: ${userId}`);
    } else {
      this.mentorClient = null;
      console.log('Mentor disconnected');
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    message: {
      text: string;
      userId: string | null;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const token = client.handshake.headers.authorization;
    const isMentor = await this.checkIsMentor(token);
    if (isMentor) {
      console.log('Mentor sent message to user ' + message.userId);
      console.log('Message: ' + message.text);
      const user = await this.prisma.user.findUnique({
        where: { id: +message.userId },
      });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      await this.prisma.chat.create({
        data: {
          userId: +message.userId,
          message: message.text,
          fromMentor: true,
        },
      });
      this.connectedUsers.get(message.userId)?.socket.emit('message', {
        text: message.text,
        userId: message.userId,
      });
    } else {
      console.log('User sent message to mentor');
      const userId = await this.getUserId(token);
      await this.prisma.chat.create({
        data: {
          userId: userId,
          message: message.text,
          fromMentor: false,
        },
      });
      this.mentorClient.emit('message', {
        text: message.text,
        userId: userId,
      });
    }
  }
}
