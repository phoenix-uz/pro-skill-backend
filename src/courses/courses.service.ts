import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async CreateCourse(body: CreateCourseDto) {
    const course = await this.prisma.courses.create({
      data: {
        ...body,
      },
    });
    return course;
  }
  async update(id: number, updateCourseDto: Body) {
    try {
      const updateCourse = await this.prisma.courses.update({
        where: { id: id },
        data: updateCourseDto,
      });
      return updateCourse;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const deletedCourse = await this.prisma.courses.delete({
        where: { id: id },
      });
      return deletedCourse;
    } catch (error) {
      throw new HttpException(
        'Failed to delete course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll() {
    const courses = await this.prisma.courses.findMany();
    return courses;
  }
}
