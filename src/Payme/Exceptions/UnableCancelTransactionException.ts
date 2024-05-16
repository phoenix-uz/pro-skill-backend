import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableCancelTransactionException extends HttpException {
  constructor(code: number, data: string) {
    super('Unable to cancel transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    this.code = code;
    this.data = data;
  }

  code: number;
  data: string;
}
