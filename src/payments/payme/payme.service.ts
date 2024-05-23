import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import getPaymeHeaders from './functions';

@Injectable()
export class PaymeService {
  constructor(private readonly prisma: PrismaService) {}

  async cardsCreate(
    card_number: string,
    expire_date: string,
    userId: number = 0,
  ) {
    const response = await fetch(`${process.env.PAYME_MERCHANT_URL}`, {
      method: 'POST',
      headers: await getPaymeHeaders(),
      body: JSON.stringify({
        id: userId,
        method: 'cards.create',
        params: {
          card: { number: card_number, expire: expire_date },
          save: false,
        },
      }),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    // Save card token to the database or update if it exists
    await this.prisma.paymeCards.upsert({
      where: {
        cardNumber: card_number,
      },
      update: {
        cardToken: data.result.card.token,
        userId: userId,
      },
      create: {
        cardNumber: card_number,
        cardToken: data.result.card.token,
        expireDate: expire_date,
        userId: userId,
      },
    });
    return data;
  }

  async cardGetVerifyCode(card_number: string) {
    const card_token = await this.prisma.paymeCards.findUnique({
      where: {
        cardNumber: card_number,
      },
    });
    const response = await fetch(`${process.env.PAYME_MERCHANT_URL}`, {
      method: 'POST',
      headers: await getPaymeHeaders(),
      body: JSON.stringify({
        id: card_token.userId,
        method: 'cards.get_verify_code',
        params: {
          token: card_token.cardToken,
        },
      }),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    return data;
  }

  async cardVerify(card_number: string, code: string) {
    const card_token = await this.prisma.paymeCards.findUnique({
      where: {
        cardNumber: card_number,
      },
    });
    const response = await fetch(`${process.env.PAYME_MERCHANT_URL}`, {
      method: 'POST',
      headers: await getPaymeHeaders(),
      body: JSON.stringify({
        id: card_token.userId,
        method: 'cards.verify',
        params: {
          token: card_token.cardToken,
          code: code,
        },
      }),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    return data;
  }

  async cardCheck(card_number: string) {
    const card_token = await this.prisma.paymeCards.findUnique({
      where: {
        cardNumber: card_number,
      },
    });
    const response = await fetch(`${process.env.PAYME_MERCHANT_URL}`, {
      method: 'POST',
      headers: await getPaymeHeaders(),
      body: JSON.stringify({
        id: card_token.userId,
        method: 'cards.check',
        params: {
          token: card_token.cardToken,
        },
      }),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    return data;
  }

  async cardRemove(card_number: string) {
    const card_token = await this.prisma.paymeCards.findUnique({
      where: {
        cardNumber: card_number,
      },
    });
    const response = await fetch(`${process.env.PAYME_MERCHANT_URL}`, {
      method: 'POST',
      headers: await getPaymeHeaders(),
      body: JSON.stringify({
        id: card_token.userId,
        method: 'cards.remove',
        params: {
          token: card_token.cardToken,
        },
      }),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    return data;
  }

  async recieptsCreate(amount: number, userId: number) {
    const response = await fetch(`${process.env.PAYME_MERCHANT_URL}`, {
      method: 'POST',
      headers: await getPaymeHeaders(true),
      body: JSON.stringify({
        id: userId,
        method: 'receipts.create',
        params: {
          amount: amount,
          account: {
            order_id: Math.floor(Math.random() * 10000000),
          },
        },
      }),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    return data;
  }

  async receiptsPay(card_number: string, receiptsId: string) {
    const card_token = await this.prisma.paymeCards.findUnique({
      where: {
        cardNumber: card_number,
      },
    });
    const response = await fetch(`${process.env.PAYME_MERCHANT_URL}`, {
      method: 'POST',
      headers: await getPaymeHeaders(true),
      body: JSON.stringify({
        id: card_token.userId,
        method: 'receipts.pay',
        params: {
          token: card_token.cardToken,
          id: receiptsId,
          payer: {
            phone: card_token.phoneNumber,
          },
        },
      }),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    return data;
  }
}
