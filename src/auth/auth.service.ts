import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(body: CreateAuthDto) {
    try {
      const password = await bcrypt.hash(
        body.password,
        +process.env.BCRYPT_PASSWORD,
      );
      const user = await this.prisma.user.create({
        data: {
          ...body,
          password: password,
        },
      });
      const payload = { sub: user.id, phone_number: user.phone_number };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user_id: user.id,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }
  async login(phone_number: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { phone_number: phone_number },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, phone_number: user.phone_number };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user.id,
    };
  }
  async getStudentCount(): Promise<number> {
    const user = await this.prisma.user.count();
    return user;
  }
  async findAll() {
    const user = await this.prisma.user.findMany();
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
