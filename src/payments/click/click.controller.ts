import { Controller, Request, Body, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClickService } from './click.service';

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
        productTipe: { type: 'string' },
        productId: { type: 'number' },
      },
    },
  })
  @Post('cardOTP')
  async buyWithCardOTP(
    @Body() body: { sms_code: string; card_number: string; productTipe: string; productId: number },
    @Request() req: any,
  ) {
    await this.clickService.confirmCardToken(body.card_number, +body.sms_code);

    const amount = await this.clickService.calculatePrice(body.productTipe, body.productId);

    await this.clickService.payWithCardToken(
      body.card_number,
      amount,
      req.userId,
    );

    // Update user payment status
    let updateData: any;
    switch (body.productTipe) {
      case 'Dars':
        updateData = { isLessonPaid: true };
        break;
      case 'Modul':
        updateData = { isModulePaid: true };
        break;
      case 'Kurs':
        updateData = { isCoursePaid: true };
        break;
    }

    const user = await this.prisma.user.update({
      where: { id: req.userId },
      data: updateData,
    });

    // Create purchase record
    await this.prisma.payments.create({
      data: {
        userId: req.userId,
        productId: body.productId,
        productType: body.productTipe,
      },
    });

    return user;
  }
}
