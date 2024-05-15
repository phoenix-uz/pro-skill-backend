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
  private connectedUsers: Map<string, Socket> = new Map(); // Map to store connected clients
  private mentorClient: Socket; // Store mentor client
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
      this.connectedUsers.set(client.id, client); // Store client in map
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
      this.connectedUsers.delete(userId);
      console.log(`User disconnected: ${userId}`);
    } else {
      this.mentorClient = null;
      console.log('Mentor disconnected');
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    { message, userId }: { message: string; userId: number | null | undefined },
  ) {
    const token = client.handshake.headers.authorization;
    const isMentor = await this.checkIsMentor(token);

    console.log('isMentor', isMentor);

    // const isMentor = await checkIsMentor(token);

    // await this.prisma.chat.create({
    //   data: {
    //     message,
    //     userId,
    //     fromMentor: false,
    //   },
    // });
    // console.log(`Received message from ${client.id}: ${message}`);
    // client.emit('message', message); // Send message back to sender

    // Broadcast message to all other connected clients
    this.broadcastMessage(client, message);
  }

  private broadcastMessage(sender: Socket, message: string) {
    // Iterate over all connected clients
    this.connectedUsers.forEach((client: Socket) => {
      // Check if client is not the message sender
      if (client.id !== sender.id) {
        // Emit the message to the client
        client.emit('message', message);
      }
    });
  }
}
