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
>>>>>>> ccf96026eb6770b7bf5097b72eb86754bc6dc396
