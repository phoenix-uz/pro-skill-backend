import { HttpException, HttpStatus } from '@nestjs/common';

export class TransactionNotFoundException extends HttpException {
  constructor(code: number, data: string) {
    super('Transaction not found', HttpStatus.NOT_FOUND);
    this.code = code;
    this.data = data;
  }

  code: number;
  data: string;
}