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
    body.products.forEach((product) => {
      if (!Object.values(ProductType).includes(product.productType)) {
        throw new HttpException('Invalid product type', HttpStatus.BAD_REQUEST);
      }
    });
  }
}
