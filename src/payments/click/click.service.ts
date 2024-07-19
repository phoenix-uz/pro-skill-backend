import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getClickHeader } from './functions';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClickService {
  constructor(private readonly prisma: PrismaService) {}

  async createCardToken(
    card_number: string,
    expire_date: string,
    userId: number,
  ) {
    const response = await fetch(
      `${process.env.CLICK_MERCHANT_URL}card_token/request`,
      {
        method: 'POST',
        headers: getClickHeader(),
        body: JSON.stringify({
          service_id: process.env.CLICK_SERVICE_ID,
          card_number: card_number,
          expire_date: expire_date,
          temporary: 1,
        }),
      },
    ).catch((error) => {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    console.log(data);
    // Save card token to the database or update if it exists
    await this.prisma.cLickCards.upsert({
      where: {
        cardNumber: card_number,
      },
      update: {
        cardToken: data.card_token,
        userId: userId,
      },
      create: {
        cardNumber: card_number,
        cardToken: data.card_token,
        expireDate: expire_date,
        phoneNumber: data.phone_number,
        userId: userId,
      },
    });
    return data;
  }

  async confirmCardToken(card_number: string, sms_code: number) {
    const card_token = await this.prisma.cLickCards.findUnique({
      where: {
        cardNumber: card_number,
      },
    });
    const response = await fetch(
      `${process.env.CLICK_MERCHANT_URL}card_token/verify`,
      {
        method: 'POST',
        headers: getClickHeader(),
        body: JSON.stringify({
          service_id: process.env.CLICK_SERVICE_ID,
          card_token: card_token.cardToken,
          sms_code: sms_code,
        }),
      },
    ).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });

    const data = await response.json();
    return data;
  }

  async payWithCardToken(
    card_number: string,
    amount: number,
    userId: number,
    // merchant_trans_id: string,
  ) {
    const card_token = await this.prisma.cLickCards.findUnique({
      where: {
        cardNumber: card_number,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const response = await fetch(
      `${process.env.CLICK_MERCHANT_URL}card_token/payment`,
      {
        method: 'POST',
        headers: getClickHeader(),
        body: JSON.stringify({
          service_id: process.env.CLICK_SERVICE_ID,
          card_token: card_token.cardToken,
          amount: amount,
          transaction_parameter: user.fullName,
        }),
      },
    ).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });

    const data = await response.json();

    return data;
  }

  async deleteCardToken(card_token: string) {
    const response = await fetch(
      `${process.env.CLICK_MERCHANT_URL}card_token/${process.env.CLICK_SERVICE_ID}/${card_token}`,
      {
        method: 'DELETE',
        headers: getClickHeader(),
      },
    ).catch((error) => {
      return error;
    });

    const data = await response.json();
    return data;
  }

  // Method to calculate price based on product type and ID
  async calculatePrice(productType: string, productId: number): Promise<number> {
    switch (productType) {
      case 'Dars':
        const lesson = await this.prisma.lessons.findUnique({
          where: { id: productId },
        });
        return lesson.price;

      case 'Modul':
        const module = await this.prisma.modules.findUnique({
          where: { id: productId },
          include: { lessons: true },
        });
        // Example logic: summing up prices of all lessons in the module
        return module.lessons.reduce((total, lesson) => total + lesson.price, 0);

      case 'Kurs':
        const course = await this.prisma.courses.findUnique({
          where: { id: productId },
          include: { modules: { include: { lessons: true } } },
        });
        // Example logic: summing up prices of all modules and lessons in the course
        return course.modules.reduce((total, module) => {
          return total + module.lessons.reduce((sum, lesson) => sum + lesson.price, 0);
        }, 0);

      default:
        throw new Error('Invalid product type');
    }
  }

  // extra functions
  async createInvoice(
    amount: number,
    phone_number: string,
    merchant_trans_id: string,
  ) {
    const response = await fetch(
      `${process.env.CLICK_MERCHANT_URL}invoice/create`,
      {
        method: 'POST',
        headers: getClickHeader(),
        body: JSON.stringify({
          service_id: process.env.CLICK_SERVICE_ID,
          amount: amount,
          phone_number: phone_number,
          merchant_trans_id: merchant_trans_id,
        }),
      },
    ).catch((error) => {
      return error;
    });

    const data = await response.json();
    return data;
  }

  async checkInvoiceStatus(invoice_id: bigint) {
    const response = await fetch(
      `${process.env.CLICK_MERCHANT_URL}invoice/status/${process.env.CLICK_SERVICE_ID}/${invoice_id}`,
      {
        method: 'GET',
        headers: getClickHeader(),
      },
    ).catch((error) => {
      return error;
    });
    const data = await response.json();
    return data;
  }

  async checkPaymentStatus(payment_id: bigint) {
    const response = await fetch(
      ` ${process.env.CLICK_MERCHANT_URL}payment/status/${process.env.CLICK_SERVICE_ID}/${payment_id}`,
      {
        method: 'GET',
        headers: getClickHeader(),
      },
    ).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    const data = await response.json();
    return data;
  }

  async checkPaymentStatusByMerchantTransId(
    merchant_trans_id: string,
    payment_date: Date | string | number,
  ) {
    // Format the date to YYYY-MM-DD
    const date = new Date(payment_date);
    const formatted_date = date.toISOString().slice(0, 10);
    const response = await fetch(
      `${process.env.CLICK_MERCHANT_URL}payment/status_by_mti/${process.env.CLICK_SERVICE_ID}/${merchant_trans_id}/${formatted_date}`,
      {
        method: 'GET',
        headers: getClickHeader(),
      },
    ).catch((error) => {
      return error;
    });
    const data = await response.json();
    return data;
  }

  async cancelPayment(payment_id: bigint) {
    const response = await fetch(
      `${process.env.CLICK_MERCHANT_URL}payment/reversal/${process.env.CLICK_SERVICE_ID}/${payment_id}`,
      {
        method: 'DELETE',
        headers: getClickHeader(),
      },
    ).catch((error) => {
      return error;
    });
    const data = await response.json();
    return data;
  }
}
