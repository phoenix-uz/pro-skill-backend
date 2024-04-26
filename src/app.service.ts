import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
const fs = require('fs'); 
const fsPromises = require('fs').promises;


@Injectable()
export class AppService {
  
  constructor(private prisma: PrismaService){}
  getHello(): string {
    return 'Hello World!';
  }
  
  async saveFile(filename: string,fileurl: string) {

    return  await this.prisma.file.create({
      data:{
        filename: filename,
        fileurl: fileurl 
      }
    })
  }

  async getPdfFilesCount() {
    const files = fs.readdirSync('uploads/pdf/');
    const pdf = files.filter(function(el, i) {
      return el.substring(el.length - 3) === 'pdf';
    });
    console.log(pdf.length);
    return pdf.length 
  }
  async getAudioFilesCount() {
    const files = fs.readdirSync('uploads/audio/');
    const mp3 = files.filter(function(el, i) {
      return el.endsWith('.mp3');
    });
    console.log(mp3.length);
    return  mp3.length ;
  }
  async getVideoFilesCount() {
    const files = fs.readdirSync('uploads/video/');
    const MP4 = files.filter(function(el, i) {
      return el.endsWith('.mp4');
    });
    console.log(MP4.length);
    return  MP4.length ;
  }

  
}

  

