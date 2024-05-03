import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { PrismaService } from 'src/prisma.service';
import { promises as fsPromises } from 'fs';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { title } from 'process';

@Injectable()
export class LibraryService {
  constructor(public readonly prisma: PrismaService) {}

  async findAll() {
    // const library = [
    //   {
    //     id: 1,
    //     name: 'Book',
    //     count: 10,
    //     photourl:
    //       'https://cdn-storage.pfcontent.net/storage/8.0/photo.aspx?photo=591361214&x=P0ttaT57LmsC97JAJVQS4Jp943xJLYRK&size=700&m=1475291093',
    //   },
    //   {
    //     id: 2,
    //     name: 'Book',
    //     count: 10,
    //     photoUrl:
    //       'https://cdn-storage.pfcontent.net/storage/8.0/photo.aspx?photo=591361214&x=P0ttaT57LmsC97JAJVQS4Jp943xJLYRK&size=700&m=1475291093',
    //   },
    //   {
    //     id: 3,
    //     name: 'Book',
    //     count: 10,
    //     photoUrl:
    //       'https://cdn-storage.pfcontent.net/storage/8.0/photo.aspx?photo=591361214&x=P0ttaT57LmsC97JAJVQS4Jp943xJLYRK&size=700&m=1475291093',
    //   },
    //   {
    //     id: 4,
    //     name: 'Book',
    //     count: 10,
    //     photoUrl:
    //       'https://cdn-storage.pfcontent.net/storage/8.0/photo.aspx?photo=591361214&x=P0ttaT57LmsC97JAJVQS4Jp943xJLYRK&size=700&m=1475291093',
    //   },
    // ];

    // include count of items in library
    const libraries: any = await this.prisma.library.findMany({
      select: {
        id: true,
        name: true,
        photoUrl: true,
        _count: {
          select: {
            items: true,
          },
        },
      },
    });
    libraries.forEach((library) => {
      library.count = library._count.items;
      delete library._count;
    });
    return libraries;
  }

  findAllWithItems() {
    return this.prisma.library.findMany({
      include: {
        items: {
          select: {
            id: true,
            title: true,
            photoUrl: true,
            length: true,
            author: true,
            price: true,
          },
        },
      },
    });
  }
  findOne(id: number) {
    const library: any = this.prisma.library.findUnique({
      where: { id },
    });
    library.count = this.prisma.item.count({
      where: {
        libraryId: id,
      },
    });
    return library;
  }
}

export class LibraryServiceAdmin extends LibraryService {
  async create(file: Express.Multer.File, body: CreateLibraryDto) {
    const filePath =
      process.env.UPLOADS_DIR + `/${Date.now()}-${file.originalname}`; // Constructing the file path

    // Saving the file to the local path
    await fsPromises.writeFile(filePath, file.buffer);
    const library = await this.prisma.library.create({
      data: {
        ...body,
        photoUrl: filePath,
      },
    });
    return library;
  }

  async update(file: Express.Multer.File, body: UpdateLibraryDto) {
    if (!file) {
      const library = await this.prisma.library.update({
        where: { id: body.id },
        data: {
          name: body.name,
        },
      });
      return library;
    } else {
      const filePath =
        process.env.UPLOADS_DIR + `/${Date.now()}-${file.originalname}`; // Constructing the file path

      // Saving the file to the local path
      await fsPromises.writeFile(filePath, file.buffer);
      //delete old file
      const oldLibrary = await this.prisma.library.findUnique({
        where: { id: body.id },
      });
      await fsPromises.unlink(oldLibrary.photoUrl);

      const library = await this.prisma.library.update({
        where: { id: body.id },
        data: {
          name: body.name,
          photoUrl: filePath,
        },
      });

      return library;
    }
  }

  async remove(id: number) {
    // delete file
    const library = await this.prisma.library.delete({
      where: { id },
    });
    await fsPromises.unlink(library.photoUrl);
    return library;
  }
}
