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

  async sendPhoneCode(phone: string) {
    const code = await this.getRandomSixDigitNumber();
    const message = `Your code is ${code}`;
    await this.prisma.phoneCode.upsert({
      where: { phone: phone },
      update: { code: code },
      create: { phone: phone, code: code },
    });
    // await this.sendSms(phone, message);
    return 'code';
  }

  // async sendSMS(number: string, message: string) {
  //   let TOKEN: any = await this.prisma.smsToken.findUnique({
  //     where: { id: 1 },
  //   });
  //   if (!TOKEN) {
  //     await this.getToken();
  //   }
  //   TOKEN = TOKEN.token;
  //   const response = await fetch(process.env.SMS_URL + 'message/sms/send', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${TOKEN}`,
  //     },
  //     body: JSON.stringify({
  //       mobile_phone: number,
  //       message: message,
  //       from: process.env.SMS_FROM,
  //     }),
  //   });
  //   if (response.status !== 200) {
  //     await this.getToken();
  //     const response = await fetch(process.env.SMS_URL + 'message/sms/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //       body: JSON.stringify({
  //         mobile_phone: number,
  //         message: message,
  //         from: process.env.SMS_FROM,
  //       }),
  //     });
  //     if (response.status !== 200) {
  //       throw new HttpException('SMS not sent', HttpStatus.BAD_REQUEST);
  //     } else {
  //       return true;
  //     }
  //   }
  //   return true;
  // }

  // async getToken() {
  //   const newToken = await fetch(process.env.SMS_URL + 'auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: process.env.SMS_EMAIL,
  //       password: process.env.SMS_PASSWORD,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .catch((error) => {
  //       throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  //     });

  //   if (newToken.data.token) {
  //     await this.prisma.smsToken.upsert({
  //       where: { id: 1 },
  //       update: { token: newToken.data.token },
  //       create: { id: 1, token: newToken.data.token },
  //     });
  //   }
  // }
  // get random 6 digit number
  async getRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
