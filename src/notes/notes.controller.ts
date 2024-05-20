import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiTags, ApiBody, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateNoteDto } from './dto/update-note.dto';
@ApiTags('Notes')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @Post()
  @ApiOperation({ summary: 'Add new note' })
  async addNotes(
    @Request() req: any,
    @Body()
    body: CreateNoteDto,
  ) {
    return this.notesService.create(req.userId, body);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all notes' })
  findByUserId(@Request() req: any) {
    return this.notesService.findByUserId(+req.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get id' })
  async findOneById(@Param('id') id: string, @Request() req: any) {
    const note = await this.notesService.findOne(req.userId, +id);
    return note;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @Patch(':id')
  @ApiOperation({ summary: 'Update note' })
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: UpdateNoteDto,
  ) {
    return this.notesService.update(+req.userId, +id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete note' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.notesService.remove(+req.userId, +id);
  }
}
