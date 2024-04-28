import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger'; 
import { PrismaService } from 'src/prisma.service'

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        title:{type:'string'},
        description: {type:'string'},
        userId: {type:'number'}
      }
    }
  })
  @Post()
  async addNotes(
    @Body() 
  body:CreateNoteDto) 
  {
    return this.notesService.create(body);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: number) {
    return this.notesService.findByUserId(+userId);
  }

@ApiBody({
    schema:{
      type:'object',
      properties:{
        title:{type:'string'},
        description: {type:'string'},
        userId: {type:'number'}
      }
    }
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Body) {
    return this.notesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
