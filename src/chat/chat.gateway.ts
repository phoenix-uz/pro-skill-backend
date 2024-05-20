import { UnauthorizedException } from '@nestjs/common';
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

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private connectedUsers: Map<string, { socket: Socket; userId: number }> =
    new Map(); // Map для хранения подключенных клиентов
  private mentorClient: Socket; // Хранение сокета ментора
  private activeUser: Socket; // Хранение текущего активного пользователя для чата с ментором

  splitToken(token) {
    const [type, splitedToken] = token.split(' ');
    return type === 'Bearer' ? splitedToken : undefined;
  }

  async checkIsMentor(token) {
    const splitedToken = this.splitToken(token);
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
      this.connectedUsers.set(client.id, { socket: client, userId }); // Сохранение клиента в карте
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
      this.connectedUsers.delete(client.id);
      console.log(`User disconnected: ${userId}`);
    } else {
      this.mentorClient = null;
      this.activeUser = null;
      console.log('Mentor disconnected');
    }
  }

  @SubscribeMessage('selectUser')
  async handleSelectUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() { userId }: { userId: number },
  ) {
    if (client !== this.mentorClient) {
      return;
    }

    const selectedUser = [...this.connectedUsers.values()].find(
      (user) => user.userId === userId,
    );

    if (selectedUser) {
      this.activeUser = selectedUser.socket;
      console.log(`Mentor selected user: ${userId}`);
      this.mentorClient.emit('userSelected', userId);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() { message }: { message: string },
  ) {
    const token = client.handshake.headers.authorization;
    const isMentor = await this.checkIsMentor(token);

    if (isMentor) {
      if (this.activeUser) {
        this.activeUser.emit('message', { message, fromMentor: true });
        this.mentorClient.emit('message', {
          message,
          toUser: this.activeUser.id,
        });
      }
    } else {
      if (
        client === this.connectedUsers.get(client.id)?.socket &&
        this.mentorClient
      ) {
        this.mentorClient.emit('message', {
          message,
          fromUser: this.connectedUsers.get(client.id)?.userId,
        });
      }
    }
  }
}
