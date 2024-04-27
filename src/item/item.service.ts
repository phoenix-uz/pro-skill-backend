/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import * as mm from 'music-metadata';
import { PDFDocument } from 'pdf-lib';
const { videoDuration } = require('@numairawan/video-duration');

const fs = require('fs');
const fsPromises = require('fs').promises;

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async CreateItem(body: CreateItemDto) {
    const extension = body.fileurl.split('.').pop();
    let length = 0;

    if (extension === 'pdf') {
      const pdfBytes = await fsPromises.readFile(body.fileurl);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const numPages = pdfDoc.getPageCount();
      length = numPages;
    } else if (extension === 'mp3') {
      const metadata = await mm.parseFile(body.fileurl);
      const durationInSeconds = metadata.format.duration;
      length = durationInSeconds;
    } else if (extension === 'MP4') {
      const duration = await videoDuration(body.fileurl);
      length = duration.seconds;
    } else {
      console.log('This file type is not supported');
    }

    const item = await this.prisma.item.create({
      data: {
        ...body,
        type: extension,
        length: length,
      },
    });

    return item;
  }

  async findAll() {
    const items = await this.prisma.item.findMany();
    return items;
  }

  async update(id: number, updateItemDto: Body) {
    try {
      const updatedItem = await this.prisma.item.update({
        where: { id: id },
        data: updateItemDto,
      });
      return updatedItem;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const deletedItem = await this.prisma.item.delete({
        where: { id: id },
      });
      return deletedItem;
    } catch (error) {
      throw new HttpException(
        'Failed to delete item',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
