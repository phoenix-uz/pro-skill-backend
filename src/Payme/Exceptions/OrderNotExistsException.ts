import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotExistsException extends HttpException {
  constructor(code: number, data: string) {
    super('order not found', HttpStatus.NOT_FOUND);
    this.code = code;
    this.data = data;
  }

  code: number;
  data: string;
}