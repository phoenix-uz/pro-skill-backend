import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/admin/admin.guard';

@ApiTags('Lessons', 'Admin')
@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string' },
        time: { type: 'string' },
        moduleId: { type: 'number' },
      },
    },
  })
  @Post()
  @ApiOperation({ summary: 'Create new lesson' })
  @UseInterceptors(FileInterceptor('file'))
  addLesson(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateLessonDto,
  ) {
    body.moduleId = +body.moduleId;
    return this.lessonsService.create(file, body);
  }
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        id: { type: 'number' },
        title: { type: 'string' },
        time: { type: 'string' },
        moduleId: { type: 'number' },
      },
    },
  })
  @Patch()
  @ApiOperation({ summary: 'Update lesson' })
  @UseInterceptors(FileInterceptor('file'))
  updateLesson(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateLessonDto,
  ) {
    body.id = +body.id;
    body.moduleId = +body.moduleId;
    return this.lessonsService.update(file, body);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete lesson by id' })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }

  @Get('module/:id')
  @ApiOperation({ summary: 'Get lessons by module id' })
  findByModuleId(@Param('id') id: string) {
    return this.lessonsService.findByModuleId(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by id' })
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }
  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  findAll() {
    return this.lessonsService.findAll();
  }
}
