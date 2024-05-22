import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma.service';
import saveFile from 'src/functions';

@Injectable()
export class LessonsService {
  constructor(public readonly prisma: PrismaService) {}
  async create(file: Express.Multer.File, body: CreateLessonDto) {
    // try {
    const filePath = await saveFile(file);
    const lesson = await this.prisma.lessons.create({
      data: {
        title: body.title,
        time: body.time,
        moduleId: body.moduleId,
        videoUrl: filePath,
        items: {
          connect: body.items.map((id) => {
            return { id };
          }),
        },
      },
    });
    return lesson;
    // } catch (error) {
    //   throw new HttpException(error, HttpStatus.FORBIDDEN);
    // }
  }
  async findAll() {
    return await this.prisma.lessons.findMany({
      include: {
        items: true,
      },
    });
  }

  async update(file: Express.Multer.File, body: UpdateLessonDto) {
    try {
      const filePath = await saveFile(file);
      if (!file) {
        const updateLesson = await this.prisma.lessons.update({
          where: { id: +body.id },
          data: {
            ...body,
            items: {
              connect: body.items.map((id) => {
                return { id };
              }),
            },
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
    return deleteLesson;
  }

  async findByModuleId(id: number) {
    return await this.prisma.lessons.findMany({
      where: {
        moduleId: id,
      },
      include: {
        items: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.lessons.findUnique({
      where: { id: id },
      include: {
        items: true,
      },
    });
  }
}
