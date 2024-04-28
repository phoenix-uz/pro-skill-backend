import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        author: { type: 'string' },
      },
    },
  })
  @Post()
  async CreateCourse(
    @Body()
    body: CreateCourseDto,
  ) {
    return this.coursesService.CreateCourse(body);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        author: { type: 'string' },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Body) {
    return this.coursesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
