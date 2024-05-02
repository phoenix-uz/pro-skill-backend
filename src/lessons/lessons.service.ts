import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { promises as fsPromises } from 'fs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LessonsService {
  constructor(public readonly prisma: PrismaService) {}
  async create(file: Express.Multer.File, body: CreateLessonDto) {
    try {
      const filePath =
        process.env.UPLOADS_DIR + `/${Date.now()}-${file.originalname}`; // Constructing the file path

      // Saving the file to the local path
      await fsPromises.writeFile(filePath, file.buffer);
      return await this.prisma.lessons.create({
        data: {
          videoUrl: filePath,
          ...body,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async update(file: Express.Multer.File, body: UpdateLessonDto) {
    try {
      const filePath =
        process.env.UPLOADS_DIR + `/${Date.now()}-${file.originalname}`; // Constructing the file path

      // Saving the file to the local path
      await fsPromises.writeFile(filePath, file.buffer);
      if (!file) {
        const updateLesson = await this.prisma.lessons.update({
          where: { id: +body.id },
          data: {
            ...body,
          },
        });
        return updateLesson;
      } else {
        const updateLesson = await this.prisma.lessons.update({
          where: { id: +body.id },
          data: {
            videoUrl: filePath,
            ...body,
          },
        });
        return updateLesson;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: number) {
    const deleteLesson = await this.prisma.lessons.delete({
      where: { id: id },
    });
    await fsPromises.unlink(deleteLesson.videoUrl);
    return deleteLesson;
  }

  async findByModuleId(id: number) {
    return await this.prisma.lessons.findMany({
      where: {
        moduleId: id,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.lessons.findUnique({
      where: { id: id },
    });
  }
}
