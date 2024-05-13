/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import * as mm from 'music-metadata';
import { PDFDocument } from 'pdf-lib';
const { videoDuration } = require('@numairawan/video-duration');
import { promises as fsPromises } from 'fs';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(public readonly prisma: PrismaService) {}

  async findAll() {
    const items = await this.prisma.item.findMany();
    return items;
  }
  async findOne(id: number) {
    return await this.prisma.item.findUnique({
      where: { id: id },
    });
  }

  async findLike(title: string) {
    return await this.prisma.item.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },

      orderBy: {
        title: 'asc',
      },

      select: {
        id: true,
        title: true,
        subtitle: true,
        author: true,
        price: true,
        length: true,
        libraryId: true,
        type: true,
        photoUrl: true,
      },
    });
  }
}

export class ItemServiceAdmin extends ItemService {
  async createItem(files: Express.Multer.File[], body: CreateItemDto) {
    // coverImage
    const coverImage = files[0];
    const imagePath =
      process.env.UPLOADS_DIR + `/${Date.now()}-${coverImage.originalname}`; // Constructing the file path

    // Saving the file to the local path
    await fsPromises.writeFile(imagePath, coverImage.buffer);

    const file = files[1];
    const filePath =
      process.env.UPLOADS_DIR + `/${Date.now()}-${file.originalname}`; // Constructing the file path

    // Saving the file to the local path
    await fsPromises.writeFile(filePath, file.buffer);
    const type = file.originalname.split('.').pop();
    if (body.length) {
      return await this.prisma.item.create({
        data: {
          photoUrl: imagePath,
          fileUrl: filePath,
          type: type,
          ...body,
        },
      });
    } else {
      if (type === 'pdf') {
        const pdfBytes = await fsPromises.readFile(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const numPages = pdfDoc.getPageCount();
        body.length = numPages;
      } else if (type === 'mp3') {
        const metadata = await mm.parseFile(filePath);
        const durationInSeconds = metadata.format.duration;
        body.length = durationInSeconds;
      } else if (type === 'MP4') {
        const duration = await videoDuration(filePath);
        body.length = duration.seconds;
      } else {
        body.length = 0;
      }
      return await this.prisma.item.create({
        data: {
          photoUrl: imagePath,
          fileUrl: filePath,
          type: type,
          ...body,
        },
      });
    }
  }

  async update(files: Express.Multer.File[], body: UpdateItemDto) {
    if (files.length === 0) {
      return await this.prisma.item.update({
        where: { id: body.id },
        data: body,
      });
    } else if (files.length === 1) {
      // throw error
      throw new HttpException(
        'Please upload both files or no files at all.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const coverImage = files[0];
    const imagePath =
      process.env.UPLOADS_DIR + `/${Date.now()}-${coverImage.originalname}`; // Constructing the file path

    // Saving the file to the local path
    await fsPromises.writeFile(imagePath, coverImage.buffer);

    const file = files[1];
    const filePath =
      process.env.UPLOADS_DIR + `/${Date.now()}-${file.originalname}`; // Constructing the file path

    // Saving the file to the local path
    await fsPromises.writeFile(filePath, file.buffer);
    const type = file.originalname.split('.').pop();
    if (body.length) {
      return await this.prisma.item.update({
        where: { id: body.id },
        data: {
          photoUrl: imagePath,
          fileUrl: filePath,
          type: type,
          ...body,
        },
      });
    } else {
      if (type === 'pdf') {
        const pdfBytes = await fsPromises.readFile(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const numPages = pdfDoc.getPageCount();
        body.length = numPages;
      } else if (type === 'mp3') {
        const metadata = await mm.parseFile(filePath);
        const durationInSeconds = metadata.format.duration;
        body.length = durationInSeconds;
      } else if (type === 'MP4') {
        const duration = await videoDuration(filePath);
        body.length = duration.seconds;
      } else {
        body.length = 0;
      }
      return await this.prisma.item.update({
        where: { id: body.id },
        data: {
          photoUrl: imagePath,
          fileUrl: filePath,
          type: type,
          ...body,
        },
      });
    }
  }

  async remove(id: number) {
    try {
      const deletedItem = await this.prisma.item.delete({
        where: { id: id },
      });
      // Deleting the file from the local path
      await fsPromises.unlink(deletedItem.fileUrl);
      await fsPromises.unlink(deletedItem.photoUrl);
      return deletedItem;
    } catch (error) {
      throw new HttpException(
        'Failed to delete item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
