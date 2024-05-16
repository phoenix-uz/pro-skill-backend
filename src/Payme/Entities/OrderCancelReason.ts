import { BadRequestException } from '@nestjs/common';

export enum OrderCancelReason {
  RECEIVER_NOT_FOUND = 1,
  DEBIT_OPERATION_ERROR,
  TRANSACTION_ERROR,
  TRANSACTION_TIMEOUT,
  MONEY_BACK,
  UNKNOWN_ERROR = 10,
}

export class OrderCancelReasonHelper {
  static fromCode(code: number): OrderCancelReason {
    const reason = Object.values(OrderCancelReason).find(
      (value) => value === code
    );

    if (reason !== undefined) {
      return reason as OrderCancelReason;
    }

    throw new BadRequestException(`Unknown code for OrderCancelReason: ${code}`);
  }
}