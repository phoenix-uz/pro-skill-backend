import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { CoursesService, CoursesServiceAdmin } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AdminGuard } from 'src/admin/admin.guard';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Courses', 'Admin')
@Controller('courses')
export class CoursesControllerAdmin {
  constructor(private readonly coursesServiceAdmin: CoursesServiceAdmin) {}
  @Post()
  @ApiOperation({ summary: 'Create new course' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Array of files to upload',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        title: { type: 'string' },
        description: { type: 'string' },
        author: { type: 'string' },
        time: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateCourseDto,
  ) {
    return this.coursesServiceAdmin.create(files, body);
  }
  @Patch()
  @ApiOperation({ summary: 'Update course' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Array of files to upload',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        id: { type: 'number' },
        title: { type: 'string' },
        description: { type: 'string' },
        author: { type: 'string' },
        time: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: UpdateCourseDto,
  ) {
    body.id = +body.id;
    return this.coursesServiceAdmin.update(files, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course' })
  remove(@Param('id') id: number) {
    return this.coursesServiceAdmin.remove(+id);
  }
}

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  findAll() {
    return this.coursesService.findAll();
  }
}
