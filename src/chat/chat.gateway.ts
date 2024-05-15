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
async function getUserId(token) {
  try {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const userId = payload.sub;
    return userId;
  } catch {
    throw new UnauthorizedException();
  }
}
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly prisma: PrismaService) {}
  private connectedUsers: Map<string, Socket> = new Map(); // Map to store connected clients

  async handleConnection(client: Socket) {
    const userId = await getUserId(client.handshake.headers.authorization);
    await this.prisma.user.update({
      where: { id: userId },
      data: { online: true },
    });
    console.log(`Client connected: ${client.id}`);

    this.connectedUsers.set(client.id, client); // Store client in map
  }

  async handleDisconnect(client: Socket) {
    const userId = await getUserId(client.handshake.headers.authorization);
    await this.prisma.user.update({
      where: { id: userId },
      data: { online: false },
    });
    console.log(`Client disconnected: ${client.id}`);
    this.connectedUsers.delete(client.id); // Remove client from map
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string,
  ) {
    const userId = await getUserId(client.handshake.headers.authorization);
    await this.prisma.chat.create({
      data: {
        message,
        userId,
        fromMentor: false,
      },
    });
    console.log(`Received message from ${client.id}: ${message}`);
    client.emit('message', message); // Send message back to sender

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
