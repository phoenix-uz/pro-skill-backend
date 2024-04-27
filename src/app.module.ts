import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { LibraryModule } from './library/library.module';
import { PrismaClient } from '@prisma/client';
import { SmsModule } from './sms/sms.module';
import { CoursesModule } from './courses/courses.module';
import { ItemModule } from './item/item.module';
import { NewsModule } from './news/news.module';


@Module({
<<<<<<< HEAD
  imports: [AuthModule, LibraryModule, LibraryModule, SmsModule, CoursesModule, ItemModule, NewsModule,],
=======
  imports: [
    AuthModule,
    LibraryModule,
    LibraryModule,
    SmsModule,
    CoursesModule,
    ItemModule,
  ],
>>>>>>> 66f4b8e810f77aca2c90769b8d9b067f1ba3662d
  controllers: [AppController],
  providers: [AppService, PrismaService, PrismaClient],
})
export class AppModule {}
