import {
  Bind,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { videoDuration } = require('@numairawan/video-duration');
import { PDFDocument } from 'pdf-lib';
import * as mm from 'music-metadata';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fsPromises = require('fs').promises;
@ApiTags('Files')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('uploads')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  async uploadFile(file) {
    const extantion = file.originalname.split('.').pop();
    console.log(extantion);
    if (extantion == 'pdf' || extantion == 'MP4' || extantion == 'mp3') {
      if (extantion == 'MP4') {
        await fsPromises.writeFile(
          'uploads/video/' + file.originalname,
          file.buffer,
        );
        console.log('video');

        const localVideoPath = 'uploads/video/' + file.originalname;
        videoDuration(localVideoPath)
          .then((duration) => {
            console.log(`Video duration: ${duration.seconds} seconds`);
          })
          .catch((error) => {
            console.error(error);
          });
        return this.appService.saveFile(file.originalname, localVideoPath);
      } else if (extantion == 'mp3') {
        const filePath = 'uploads/audio/' + file.originalname;

        // Сохранение аудиофайла на диск
        await fsPromises.writeFile(filePath, file.buffer);

        // Считывание метаданных аудиофайла после сохранения
        const metadata = await mm.parseFile(filePath);
        const durationInSeconds = metadata.format.duration;

        console.log(`Audio duration: ${durationInSeconds} seconds`);

        // Возвращение успешного завершения операции
        return this.appService.saveFile(file.originalname, filePath);
      } else {
        await fsPromises.writeFile(
          'uploads/pdf/' + file.originalname,
          file.buffer,
        );

        // Считывание PDF файла
        const localPdfPath = 'uploads/pdf/' + file.originalname;
        const pdfBytes = await fsPromises.readFile(localPdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Получение количества страниц в PDF файле
        const numPages = pdfDoc.getPageCount();
        console.log(`Number of pages in PDF: ${numPages}`);

        return this.appService.saveFile(file.originalname, localPdfPath);
      }
    } else {
      throw new HttpException(
        'Недопустимый тип файла. Пожалуйста, загрузите файл с допустимым расширением (pdf/mp4/mp3)',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  @Get('file-count')
  async getFileCount() {
    const pdfCount = await this.appService.getPdfFilesCount();
    const audioCount = await this.appService.getAudioFilesCount();
    const videoCount = await this.appService.getVideoFilesCount();

    return {
      'pdf count': pdfCount,
      'audio count': audioCount,
      'video count': videoCount,
    };
  }
  @Post('')
  async post(@Request() req: any) {
    console.log(req.body);
  }
}
