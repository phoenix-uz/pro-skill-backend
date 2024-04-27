import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LibraryService {
  constructor(private readonly prisma: PrismaService) {}

  async createItem(body: CreateLibraryDto) {
    const library = await this.prisma.library.create({
      data: {
        ...body,
      },
    });
    return library;
  }

  findAll() {
    return `This action returns all library`;
  }

  findOne(id: number) {
    return `This action returns a #${id} library`;
  }

  update(id: number) {
    return `This action updates a #${id} library`;
  }

  remove(id: number) {
    return `This action removes a #${id} library`;
  }
}
