import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getTest(): string {
    return 'Rediska Kolobokova!';
  }
}
