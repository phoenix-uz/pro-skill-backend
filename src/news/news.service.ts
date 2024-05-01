import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateNewsDto) {
    const news = await this.prisma.news.create({
      data: {
        ...body,
      },
    });
    return news;
  }

  async findAll() {
    const news = await this.prisma.news.findMany();
    return news;
  }

  async findOne(id: number) {
    try {
      const getNews = await this.prisma.news.findUnique({
        where: { id: id },
      });
      return getNews;
    } catch (error) {
      throw new HttpException(
        'Failed to delete news',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    try {
      const updateNews = await this.prisma.news.update({
        where: { id: id },
        data: updateNewsDto,
      });
      return updateNews;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update news',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const deletednews = await this.prisma.news.delete({
        where: { id: id },
      });
      return deletednews;
    } catch (error) {
      throw new HttpException(
        'Failed to delete news',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
