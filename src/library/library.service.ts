import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { PrismaService } from 'src/prisma.service';
import { count } from 'console';

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
    const library = [
      {
        id: 1,
        name: 'Book',
        count: 10,
        photourl:
          'https://cdn-storage.pfcontent.net/storage/8.0/photo.aspx?photo=591361214&x=P0ttaT57LmsC97JAJVQS4Jp943xJLYRK&size=700&m=1475291093',
      },
      {
        id: 2,
        name: 'Book',
        count: 10,
        photoUrl:
          'https://cdn-storage.pfcontent.net/storage/8.0/photo.aspx?photo=591361214&x=P0ttaT57LmsC97JAJVQS4Jp943xJLYRK&size=700&m=1475291093',
      },
      {
        id: 3,
        name: 'Book',
        count: 10,
        photoUrl:
          'https://cdn-storage.pfcontent.net/storage/8.0/photo.aspx?photo=591361214&x=P0ttaT57LmsC97JAJVQS4Jp943xJLYRK&size=700&m=1475291093',
      },
      {
        id: 4,
        name: 'Book',
        count: 10,
        photoUrl:
          'https://cdn-storage.pfcontent.net/storage/8.0/photo.aspx?photo=591361214&x=P0ttaT57LmsC97JAJVQS4Jp943xJLYRK&size=700&m=1475291093',
      },
    ];
    return library;
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
