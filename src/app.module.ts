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
import { NotesModule } from './notes/notes.module';


@Module({
  imports: [
    AuthModule,
    LibraryModule,
    LibraryModule,
    SmsModule,
    CoursesModule,
    ItemModule,
    NewsModule,
    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, PrismaClient],
})
export class AppModule {}
