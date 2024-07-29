import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import saveFile from 'src/functions';

@Injectable()
export class CoursesService {
  constructor(public readonly prisma: PrismaService) {}
  async findAll() {
    const courses = await this.prisma.courses.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        photoUrls: true,
        time: true,
        price: true,
        author: true,
        _count: {
          select: { modules: true },
        },
      },
    });
    return courses;
  }

  async findAllUnique(userId: number) {
    // Fetch all courses with selected fields
    let courses: any = await this.prisma.courses.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        photoUrls: true,
        time: true,
        price: true,
        Paid: {
          where: { userId: userId },
          select: { id: true },
        },
        modules: {
          select: { id: true },
        },
      },
    });

    // Mark courses as paid or not based on the Paid field
    courses = courses.map((course) => {
      course.paid = course.Paid.length > 0;
      delete course.Paid;
      return course;
    });

    // Fetch all paid modules for the user
    const paidModules = await this.prisma.modules.findMany({
      where: { Paid: { some: { userId: userId } } },
      select: { courseId: true },
    });

    // Create a map of courseId to the count of paid modules
    const paidModulesCountMap = paidModules.reduce((acc, module) => {
      acc[module.courseId] = (acc[module.courseId] || 0) + 1;
      return acc;
    }, {});

    // Adjust course price based on the proportion of purchased modules
    courses = courses.map((course) => {
      if (!course.paid) {
        const totalModules = course.modules.length;
        const paidModulesCount = paidModulesCountMap[course.id] || 0;

        if (paidModulesCount === totalModules && totalModules > 0) {
          course.paid = true;
        } else {
          const proportionPaid = paidModulesCount / totalModules || 0;
          course.price =
            Math.round((course.price * (1 - proportionPaid)) / 1000) * 1000;
        }
      }

      delete course.modules;
      return course;
    });

    return courses;
  }

  async findOne(id: number) {
    const course = await this.prisma.courses.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        photoUrls: true,
        time: true,
        price: true,
        author: true,
        modules: {
          select: {
            id: true,
            title: true,
            time: true,
            price: true,
            lessons: {
              select: {
                id: true,
                title: true,
                time: true,
                price: true,
              },
            },
          },
        },
      },
    });
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    return course;
  }

  async findOneUnique(id: number) {
    const course = await this.prisma.courses.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        photoUrls: true,
        time: true,
        price: true,
        author: true,
        modules: {
          select: {
            id: true,
            title: true,
            time: true,
            price: true,
            lessons: {
              select: {
                id: true,
                title: true,
                time: true,
                price: true,
              },
            },
          },
        },
      },
    });
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    return course;
  }
}

export class CoursesServiceAdmin extends CoursesService {
  async create(files: Express.Multer.File[], body: CreateCourseDto) {
    try {
      const photoUrls = [];

      // Use map to create an array of promises for each file upload operation
      const uploadPromises = files.map(async (file) => {
        const filePath = await saveFile(file);
        // Push the file path into the photoUrls array
        return photoUrls.push(filePath);
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
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(files: Express.Multer.File[], body: UpdateCourseDto) {
    try {
      const photoUrls = [];

      // Use map to create an array of promises for each file upload operation
      const uploadPromises = files.map(async (file) => {
        const filePath = await saveFile(file);
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
            price: body.price,
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
      const modules = await this.prisma.modules.findMany({
        where: { courseId: id },
      });
      for (let i = 0; i < modules.length; i++) {
        const lessons = await this.prisma.lessons.findMany({
          where: { moduleId: modules[i].id },
        });
        for (let j = 0; j < lessons.length; j++) {
          const questions = await this.prisma.questions.findMany({
            where: { lessonId: lessons[j].id },
          });
          for (let k = 0; k < questions.length; k++) {
            await this.prisma.answers.deleteMany({
              where: { questionId: questions[k].id },
            });
          }
          await this.prisma.questions.deleteMany({
            where: { lessonId: lessons[j].id },
          });
        }
        await this.prisma.lessons.deleteMany({
          where: { moduleId: modules[i].id },
        });
      }
      await this.prisma.modules.deleteMany({
        where: { courseId: id },
      });
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
