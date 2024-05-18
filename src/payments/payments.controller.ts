import {
  Controller,
  Request,
  Body,
  Post,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ClickService, PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Payme')
@Controller('payme')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post('')
  @HttpCode(200)
  async createInvoice() {
    return {
      jsonrpc: '2.0',
      error: { code: -32504, message: 'Invalid Request' },
      id: null,
    };
  }
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
        name: { type: 'string' },
      },
    },
  })
  @Post('cardOTP')
  async buyWithCardOTP(
    @Body() body: { sms_code: string; card_number: string; name: string },
    @Request() req: any,
  ) {
    const confirmCard = await this.clickService.confirmCardToken(
      body.card_number,
      +body.sms_code,
    );
    console.log(confirmCard);
    if (body.name === 'Dars') {
      const payment = await this.clickService.payWithCardToken(
        body.card_number,
        1000,
        req.userId + '_dars',
      );
      console.log(payment);
      const user = await this.prisma.user.update({
        where: { id: req.userId },
        data: { isLessonPaid: true },
      });
      return user;
    } else if (body.name === 'Modul') {
      await this.clickService.payWithCardToken(
        body.card_number,
        2000,
        req.userId + '_modul',
      );
      const user = await this.prisma.user.update({
        where: { id: req.userId },
        data: { isModulePaid: true },
      });
      return user;
    } else if (body.name === 'Kurs') {
      await this.clickService.payWithCardToken(
        body.card_number,
        3000,
        req.userId + '_kurs',
      );
      const user = await this.prisma.user.update({
        where: { id: req.userId },
        data: { isCoursePaid: true },
      });
      return user;
    }
  }
}
