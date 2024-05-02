import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, body: CreateNoteDto) {
    const notes = await this.prisma.notes.create({
      data: {
        userId: userId,
        ...body,
      },
    });
    return notes;
  }

  // async findAll() {
  //   const notes = await this.prisma.notes.findMany();
  //   return notes;
  // }

  async findByUserId(userId: number) {
    try {
      const findNotes = await this.prisma.notes.findMany({
        where: { userId: userId },
        orderBy: { id: 'asc' },
      });
      return findNotes;
    } catch (error) {
      throw new HttpException(
        'Failed to update notes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(userId: number, id: number, body: UpdateNoteDto) {
    try {
      const updateNotes = await this.prisma.notes.update({
        where: { userId: userId, id: id },
        data: body,
      });
      return updateNotes;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update notes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(userId: number, id: number) {
    try {
      const deletednotes = await this.prisma.notes.delete({
        where: { userId: userId, id: id },
      });
      return deletednotes;
    } catch (error) {
      throw new HttpException(
        'Failed to delete notes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
