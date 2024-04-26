import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client'

@Module({
  controllers: [LibraryController],
  providers: [LibraryService, PrismaService, PrismaClient],
})
export class LibraryModule {}
