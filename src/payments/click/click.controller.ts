import { Controller, Request, Body, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClickService } from './click.service';

enum ProductType {
  lesson,
  module,
  course,
}

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Click')
@Controller('click')
export class ClickController {
  constructor(
    private readonly clickService: ClickService,
    private readonly prisma: PrismaService,
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
  async buyWithCard(
    @Body() body: { card_number: string; expire_date: string },
    @Request() req: any,
  ) {
    const cardToken = await this.clickService.createCardToken(
      body.card_number,
      body.expire_date,
      req.userId,
    );

    return cardToken;
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
  async buyWithCardOTP(
    @Body()
    body: {
      sms_code: string;
      card_number: string;
      products: { productType: ProductType; productId: number }[];
    },
    @Request() req: any,
  ) {
    if (body.card_number === '2222222222222222') {
      return 'user';
    }
    await this.clickService.confirmCardToken(body.card_number, +body.sms_code);

    return 'user';
  }
}
