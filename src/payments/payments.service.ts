import { Injectable } from '@nestjs/common';
import { getClickHeader } from './functions';

@Injectable()
export class PaymentsService {}

@Injectable()
export class ClickService {
  async createInvoice(
    amount: number,
    phone_number: string,
    merchant_trans_id: string,
  ) {
    const response = await fetch(
      'https://api.click.uz/v2/merchant/invoice/create',
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
      `https://api.click.uz/v2/merchant/invoice/status/${process.env.CLICK_SERVICE_ID}/${invoice_id}`,
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
      ` https://api.click.uz/v2/merchant/payment/status/${process.env.CLICK_SERVICE_ID}/${payment_id}`,
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

  async checkPaymentStatusByMerchantTransId(
    merchant_trans_id: string,
    payment_date: Date | string | number,
  ) {
    // Format the date to YYYY-MM-DD
    const date = new Date(payment_date);
    const formatted_date = date.toISOString().slice(0, 10);
    const response = await fetch(
      `https://api.click.uz/v2/merchant/payment/status_by_mti/${process.env.CLICK_SERVICE_ID}/${merchant_trans_id}/${formatted_date}`,
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
      `https://api.click.uz/v2/merchant/payment/reversal/${process.env.CLICK_SERVICE_ID}/${payment_id}`,
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

  async createCardToken(card_number: string, expire_date: string) {
    const response = await fetch(
      'https://api.click.uz/v2/merchant/card_token/request',
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
      return error;
    });

    const data = await response.json();
    return data;
  }

  async confirmCardToken(card_token: string, sms_code: number) {
    const response = await fetch(
      'https://api.click.uz/v2/merchant/card_token/verify',
      {
        method: 'POST',
        headers: getClickHeader(),
        body: JSON.stringify({
          service_id: process.env.CLICK_SERVICE_ID,
          card_token: card_token,
          sms_code: sms_code,
        }),
      },
    ).catch((error) => {
      return error;
    });

    const data = await response.json();
    return data;
  }

  async payWithCardToken(
    card_token: string,
    amount: number,
    merchant_trans_id: string,
  ) {
    const response = await fetch(
      'https://api.click.uz/v2/merchant/card_token/payment',
      {
        method: 'POST',
        headers: getClickHeader(),
        body: JSON.stringify({
          service_id: process.env.CLICK_SERVICE_ID,
          card_token: card_token,
          amount: amount,
          transaction_parameter: merchant_trans_id,
        }),
      },
    ).catch((error) => {
      return error;
    });

    const data = await response.json();
    return data;
  }

  async deleteCardToken(card_token: string) {
    const response = await fetch(
      `https://api.click.uz/v2/merchant/card_token/${process.env.CLICK_SERVICE_ID}/${card_token}`,
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
