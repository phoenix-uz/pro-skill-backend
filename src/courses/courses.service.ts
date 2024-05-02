import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { promises as fsPromises } from 'fs';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(public readonly prisma: PrismaService) {}
  async findAll() {
    const courses = await this.prisma.courses.findMany();
    return courses;
  }
}

export class CoursesServiceAdmin extends CoursesService {
  async create(files: Express.Multer.File[], body: CreateCourseDto) {
    try {
      const photoUrls = [];

      // Use map to create an array of promises for each file upload operation
      const uploadPromises = files.map(async (file) => {
        const filePath = `${process.env.UPLOADS_DIR}/${Date.now()}-${file.originalname}`;

        // Await the file write operation
        await fsPromises.writeFile(filePath, file.buffer);

        // Push the file path into the photoUrls array
        photoUrls.push(filePath);
      });

      // Wait for all file upload promises to resolve
      await Promise.all(uploadPromises);
      const course = await this.prisma.courses.create({
        data: {
          photoUrls: photoUrls,
          ...body,
        },
      });
      return course;
    } catch (error) {
      throw new HttpException(
        'Failed to create course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(files: Express.Multer.File[], body: UpdateCourseDto) {
    try {
      const photoUrls = [];

      // Use map to create an array of promises for each file upload operation
      const uploadPromises = files.map(async (file) => {
        const filePath = `${process.env.UPLOADS_DIR}/${Date.now()}-${file.originalname}`;

        // Await the file write operation
        await fsPromises.writeFile(filePath, file.buffer);

        // Push the file path into the photoUrls array
        photoUrls.push(filePath);
      });

      // Wait for all file upload promises to resolve
      await Promise.all(uploadPromises);

      if (photoUrls.length === 0) {
        const course = await this.prisma.courses.update({
          where: { id: body.id },
          data: {
            title: body.title,
            description: body.description,
            author: body.author,
            time: body.time,
          },
        });
        return course;
      }
      const updateCourse = await this.prisma.courses.update({
        where: { id: body.id },
        data: {
          ...body,
          photoUrls: photoUrls,
        },
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
}
