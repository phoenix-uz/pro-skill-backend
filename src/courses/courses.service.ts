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

  // async findAllUnique() {
  //   const courses = await this.prisma.courses.findMany({
  //     select: {
  //       id: true,
  //       title: true,
  //       description: true,
  //       photoUrls: true,
  //       time: true,
  //       price: true,
  //       author: true,
  //       _count: {
  //         select: { modules: true },
  //       },
  //     },
  //   });
  //   return courses;
  // }

  // TODO change
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
        _count: {
          select: { modules: true },
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
          course.price = 0;
        } else {
          const proportionPaid = paidModulesCount / totalModules || 0;
          course.price =
            Math.round((course.price * (1 - proportionPaid)) / 1000) * 1000;
        }
      } else {
        course.price = 0;
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

  async findOneUnique(id: number, userId: number) {
    // Fetch the course by its ID
    const course: any = await this.prisma.courses.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        photoUrls: true,
        time: true,
        price: true,
        author: true,
        Paid: {
          where: { userId: userId },
          select: { id: true },
        },
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
                Paid: {
                  where: { userId: userId },
                  select: { id: true },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    // Mark the course as paid or not based on the Paid field
    course.paid = course.Paid.length > 0;
    delete course.Paid;

    // Fetch all paid modules and lessons for the user in this course
    const paidModules = await this.prisma.modules.findMany({
      where: {
        courseId: id,
        Paid: { some: { userId: userId } },
      },
      select: { id: true },
    });

    const totalModules = course.modules.length;
    const paidModulesCount = paidModules.length;

    // Adjust the course price based on the proportion of purchased modules
    if (!course.paid) {
      if (paidModulesCount === totalModules && totalModules > 0) {
        course.paid = true;
        course.price = 0;
      } else {
        const proportionPaid = paidModulesCount / totalModules || 0;
        course.price =
          Math.round((course.price * (1 - proportionPaid)) / 1000) * 1000;
      }
    } else {
      course.price = 0;
    }

    // Process each module
    course.modules = course.modules.map((module) => {
      // Fetch all paid lessons for this module
      const paidLessons = module.lessons.filter(
        (lesson) => lesson.Paid.length > 0,
      );

      const totalLessons = module.lessons.length;
      const paidLessonsCount = paidLessons.length;

      // Adjust module price based on the proportion of purchased lessons
      if (!module.paid) {
        if (paidLessonsCount === totalLessons && totalLessons > 0) {
          module.paid = true;
          module.price = 0;
        } else {
          const proportionPaid = paidLessonsCount / totalLessons || 0;
          module.price =
            Math.round((module.price * (1 - proportionPaid)) / 1000) * 1000;
        }
      } else {
        module.price = 0;
      }

      // Mark each lesson as paid and set its price to 0 if fully paid
      module.lessons = module.lessons.map((lesson) => {
        const isLessonPaid = lesson.Paid.length > 0;

        if (isLessonPaid || module.paid) {
          lesson.price = 0;
          lesson.paid = true;
        } else {
          lesson.paid = false;
        }

        delete lesson.Paid;
        return lesson;
      });

      return module;
    });

    return course;
  }

  async findBought(userId: number) {
    const paid = await this.prisma.paid.findMany({
      where: { userId: userId },
      select: {
        Lesson: {
          select: {
            Modules: {
              select: {
                courseId: true,
              },
            },
          },
        },

        Module: {
          select: {
            courseId: true,
          },
        },
        courseId: true,
      },
    });

    // Extract the courseId from the returned data
    const courseIds = paid.map((item) => {
      // Check for courseId in Lesson -> Modules
      if (item.Lesson?.Modules?.courseId) {
        return item.Lesson.Modules.courseId;
      }
      // Check for courseId in Module
      if (item.Module?.courseId) {
        return item.Module.courseId;
      }
      // Check for direct courseId
      if (item.courseId) {
        return item.courseId;
      }
    });
    // Filter out null values and remove duplicates using a Set
    const uniqueCourseIds = [...new Set(courseIds.filter((id) => id !== null))];

    // Fetch the courses with the unique course IDs
    const courses = await this.prisma.courses.findMany({
      where: { id: { in: uniqueCourseIds } },
    });

    return courses;
  }

  async findOneBought(id: number, userId: number) {
    // Fetch the course by its ID
    const course: any = await this.prisma.courses.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        photoUrls: true,
        time: true,
        price: true,
        author: true,
        Paid: {
          where: { userId: userId },
          select: { id: true },
        },
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
                videoUrl: true,
                questions: {
                  include: {
                    answers: {
                      select: { id: true, title: true },
                    },
                  },
                },
                time: true,
                price: true,
                Paid: {
                  where: { userId: userId },
                  select: { id: true },
                },
              },
            },
          },
        },
      },
    });
    const paid = await this.prisma.paid.findMany({
      where: { userId: userId },
      select: {
        Lesson: {
          select: {
            Modules: {
              select: {
                courseId: true,
              },
            },
          },
        },

        Module: {
          select: {
            courseId: true,
          },
        },
        courseId: true,
      },
    });

    // Extract the courseId from the returned data
    const courseIds = paid.map((item) => {
      // Check for courseId in Lesson -> Modules
      if (item.Lesson?.Modules?.courseId) {
        return item.Lesson.Modules.courseId;
      }
      // Check for courseId in Module
      if (item.Module?.courseId) {
        return item.Module.courseId;
      }
      // Check for direct courseId
      if (item.courseId) {
        return item.courseId;
      }
    });
    // Filter out null values and remove duplicates using a Set
    const uniqueCourseIds = [...new Set(courseIds.filter((id) => id !== null))];

    // Fetch the courses with the unique course IDs
    const paidCourses = await this.prisma.courses.findMany({
      where: { id: { in: uniqueCourseIds } },
    });

    // course should be in paidCourses
    if (!paidCourses.find((c) => c.id === course.id)) {
      throw new HttpException('Вы не купили этот курс', HttpStatus.NOT_FOUND);
    }
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    // Mark the course as paid or not based on the Paid field
    course.paid = course.Paid.length > 0;
    delete course.Paid;

    // Fetch all paid modules and lessons for the user in this course
    const paidModules = await this.prisma.modules.findMany({
      where: {
        courseId: id,
        Paid: { some: { userId: userId } },
      },
      select: { id: true },
    });

    const totalModules = course.modules.length;
    const paidModulesCount = paidModules.length;

    // Adjust the course price based on the proportion of purchased modules
    if (!course.paid) {
      if (paidModulesCount === totalModules && totalModules > 0) {
        course.paid = true;
        course.price = 0;
      } else {
        const proportionPaid = paidModulesCount / totalModules || 0;
        course.price =
          Math.round((course.price * (1 - proportionPaid)) / 1000) * 1000;
      }
    } else {
      course.price = 0;
    }

    // Process each module
    course.modules = course.modules.map((module) => {
      // Fetch all paid lessons for this module
      const paidLessons = module.lessons.filter(
        (lesson) => lesson.Paid.length > 0,
      );

      const totalLessons = module.lessons.length;
      const paidLessonsCount = paidLessons.length;

      // Adjust module price based on the proportion of purchased lessons
      if (!module.paid) {
        if (paidLessonsCount === totalLessons && totalLessons > 0) {
          module.paid = true;
          module.price = 0;
        } else {
          const proportionPaid = paidLessonsCount / totalLessons || 0;
          module.price =
            Math.round((module.price * (1 - proportionPaid)) / 1000) * 1000;
        }
      } else {
        module.price = 0;
      }

      // Mark each lesson as paid and set its price to 0 if fully paid
      module.lessons = module.lessons.map((lesson) => {
        const isLessonPaid = lesson.Paid.length > 0;

        if (isLessonPaid || module.paid) {
          lesson.price = 0;
          lesson.paid = true;
        } else {
          delete lesson.videoUrl;
          delete lesson.questions;

          lesson.paid = false;
        }

        delete lesson.Paid;
        return lesson;
      });

      return module;
    });

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
