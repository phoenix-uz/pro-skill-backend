import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { LibraryModule } from './library/library.module';
import { SmsModule } from './sms/sms.module';
import { CoursesModule } from './courses/courses.module';
import { ItemModule } from './item/item.module';
import { NewsModule } from './news/news.module';

import { NotesModule } from './notes/notes.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    AuthModule,
    LibraryModule,
    LibraryModule,
    SmsModule,
    CoursesModule,
    ItemModule,
    NewsModule,
    NotesModule,

    //for serving static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads', // URL path to serve the files from
    }),

    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
