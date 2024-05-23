import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PaymeService } from './payme.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Payme')
@Controller('payme')
export class PaymeController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymeService: PaymeService,
  ) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        card_number: { type: 'string' },
        expire_date: { type: 'string' },
      },
    },
  })
  @Post('card')
  async createInvoice(
    @Body() body: { card_number: string; expire_date: string },
    @Request() req: any,
  ) {
    await this.paymeService.cardsCreate(
      body.card_number,
      body.expire_date,
      req.userId,
    );
    const getVerifyCode = await this.paymeService.cardGetVerifyCode(
      body.card_number,
    );
    return getVerifyCode;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sms_code: { type: 'string' },
        card_number: { type: 'string' },
        name: { type: 'string' },
      },
    },
  })
  @Post('cardOTP')
  async verifyCard(
    @Body() body: { sms_code: string; card_number: string; name: string },
    @Request() req: any,
  ) {
    await this.paymeService.cardVerify(body.card_number, body.sms_code);
    let receipt;
    let pay;
    if (body.name === 'Dars') {
      const user = await this.prisma.user.findUnique({
        where: { id: req.userId },
      });
      if (user.isLessonPaid) {
        throw new HttpException(
          'Вы уже купили урок',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      receipt = await this.paymeService.recieptsCreate(100000, req.userId);
      pay = await this.paymeService.receiptsPay(
        body.card_number,
        receipt.result.receipt._id,
      );
      await this.prisma.user.update({
        where: { id: req.userId },
        data: { isLessonPaid: true },
      });
    } else if (body.name === 'Modul') {
      const user = await this.prisma.user.findUnique({
        where: { id: req.userId },
      });
      if (user.isModulePaid) {
        throw new HttpException(
          'Вы уже купили модуль',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      receipt = await this.paymeService.recieptsCreate(200000, req.userId);
      pay = await this.paymeService.receiptsPay(
        body.card_number,
        receipt.result.receipt._id,
      );
      await this.prisma.user.update({
        where: { id: req.userId },
        data: { isModulePaid: true },
      });
    } else if (body.name === 'Kurs') {
      const user = await this.prisma.user.findUnique({
        where: { id: req.userId },
      });
      if (user.isCoursePaid) {
        throw new HttpException(
          'Вы уже купили курс',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      receipt = await this.paymeService.recieptsCreate(300000, req.userId);
      pay = await this.paymeService.receiptsPay(
        body.card_number,
        receipt.result.receipt._id,
      );
      await this.prisma.user.update({
        where: { id: req.userId },
        data: { isCoursePaid: true },
      });
    }
    return pay;
  }
}
