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
  @Body() body: { sms_code: string; card_number: string; productId: number; productType: string },
  @Request() req: any,
) {
  await this.paymeService.cardVerify(body.card_number, body.sms_code);

  let product;
  let amount;

  // Определяем стоимость и проверяем наличие покупки в зависимости от типа продукта
  if (body.productType === 'Lesson') {
    product = await this.prisma.lessons.findUnique({
      where: { id: body.productId },
    });
    if (!product) {
      throw new HttpException('Урок не найден', HttpStatus.NOT_FOUND);
    }
    amount = 100000;
  } else if (body.productType === 'Module') {
    product = await this.prisma.modules.findUnique({
      where: { id: body.productId },
    });
    if (!product) {
      throw new HttpException('Модуль не найден', HttpStatus.NOT_FOUND);
    }
    amount = 200000;
  } else if (body.productType === 'Course') {
    product = await this.prisma.courses.findUnique({
      where: { id: body.productId },
    });
    if (!product) {
      throw new HttpException('Курс не найден', HttpStatus.NOT_FOUND);
    }
    amount = 300000;
  } else {
    throw new HttpException('Неверный тип продукта', HttpStatus.BAD_REQUEST);
  }

  // const existingPurchase = await this.prisma.payments.findFirst({
  //   where: {
  //     userId: req.userId,
  //     productId: body.productId,
  //     productType: body.productType,
  //   },
  // });

  // if (existingPurchase) {
  //   throw new HttpException(
  //     `Вы уже купили этот ${body.productType}`,
  //     HttpStatus.NOT_ACCEPTABLE,
  //   );
  // }

  const receipt = await this.paymeService.recieptsCreate(amount, req.userId);
  const pay = await this.paymeService.receiptsPay(
    body.card_number,
    receipt.result.receipt._id,
  );

  await this.prisma.payments.create({
    data: {
      userId: req.userId,
      productId: body.productId,
      productType: body.productType,
    },
  });

  return pay;
}


}
