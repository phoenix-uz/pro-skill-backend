import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableCompleteException extends HttpException {
  constructor(code: number, data: string) {
    super('Unable to complete operation', HttpStatus.INTERNAL_SERVER_ERROR);
    this.code = code;
    this.data = data;
  }

  code: number;
  data: string;
}