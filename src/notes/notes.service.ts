import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {} 

  async create(body: CreateNoteDto) {
    const notes = await this.prisma.notes.create({
      data: {
        ...body,
      },
    });
    return notes;
  }

  async findAll() {
    const notes = await this.prisma.notes.findMany();
    return notes
  }

  async findByUserId(userId: number){
    try{
      const findNotes = await this.prisma.notes.findMany({
        where: {userId: userId}
      })
      return findNotes
    }
    catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update notes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  async update(id: number, updateNoteDto: Body) {
    try {
      const updateNotes = await this.prisma.notes.update({
        where: { id: id },
        data: updateNoteDto,
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

  async remove(id: number) {
    try {
      const deletednotes = await this.prisma.notes.delete({
        where: { id: id },
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
