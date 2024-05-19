import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(body: CreateModuleDto) {
    return await this.prisma.modules.create({
      data: {
        ...body,
      },
    });
  }
  async update(id: number, body: UpdateModuleDto) {
    return await this.prisma.modules.update({
      where: { id: id },
      data: {
        ...body,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.modules.delete({
      where: { id: id },
    });
  }

  async findByCourseId(id: number) {
    return await this.prisma.modules.findMany({
      where: {
        courseId: id,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.modules.findUnique({
      where: { id: id },
    });
  }

  async findAll() {
    return await this.prisma.modules.findMany();
  }
}
