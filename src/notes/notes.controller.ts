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

  // @Get('all-notes')
  // findAll() {
  //   return this.notesService.findAll();
  // }

  @Get('')
  @ApiOperation({ summary: 'Get all notes' })
  findByUserId(@Request() req: any) {
    return this.notesService.findByUserId(+req.userId);
  }

<<<<<<< HEAD
  @Get(':userId/:id')
  @ApiOperation({ summary: 'Get note by user id and note id' })
  async findOneById(@Param('userId') userId: string, @Param('id') id: string) {
    const note = await this.notesService.findOne(Number(userId), Number(id));
    if (!note) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }
    return note;
=======
  @Get(':userId')
  @ApiOperation({ summary: 'Get note by user id' })
  findOne(@Request() req: any, @Param('userId') id: string) {
    return this.notesService.findOne(+req.userId);
>>>>>>> e291b503c420f34d4d9ad3ab55ed678495a0a66d
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
