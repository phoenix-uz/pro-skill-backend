import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService],
})
<<<<<<< HEAD
export class CoursesModule {}
=======
export class CoursesModule {}
>>>>>>> 66f4b8e810f77aca2c90769b8d9b067f1ba3662d
