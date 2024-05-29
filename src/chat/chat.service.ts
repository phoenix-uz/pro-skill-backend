import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}
    
    async findAll() {
        const chat = await this.prisma.chat.findMany();
        return chat;
    }

    async findById(id: number) {
        try {
            const chat = await this.prisma.chat.findUnique({
                where: { id: id },
            });
            
            if (!chat) {
                throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
            }
            return chat;
        } catch (error) {
            throw new HttpException('An error occurred while retrieving the chat', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
