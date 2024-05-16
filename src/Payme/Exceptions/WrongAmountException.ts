import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongAmountException extends HttpException {
  constructor(code: number, data: string) {
    super('Wrong amount', HttpStatus.BAD_REQUEST);
    this.code = code;
    this.data = data;
  }

  code: number;
  data: string;
}