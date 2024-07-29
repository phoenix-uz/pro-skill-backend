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
import { ProductType } from '@prisma/client';

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
        products: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productType: { type: 'string' },
              productId: { type: 'number' },
            },
          },
        },
      },
    },
  })
  @Post('cardOTP')
  async verifyCard(
    @Body()
    body: {
      sms_code: string;
      card_number: string;
      products: { productType: ProductType; productId: number }[];
    },
    @Request() req: any,
  ) {
    return 'test';
    await this.paymeService.cardVerify(body.card_number, body.sms_code);

    let amount;
    if (body.productType === 'Lesson') {
      amount = await this.paymeService.calculateLessonPrice(body.productId);
    } else if (body.productType === 'Module') {
      amount = await this.paymeService.calculateModulePrice(body.productId);
    } else if (body.productType === 'Course') {
      amount = await this.paymeService.calculateCoursePrice(body.productId);
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

    // await this.prisma.payments.create({
    //   data: {
    //     userId: req.userId,
    //     productId: body.productId,
    //     productType: body.productType,
    //   },
    // });

    return pay;
  }
}
