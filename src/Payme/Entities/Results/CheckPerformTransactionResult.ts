import { IsBoolean, IsString } from 'class-validator';

export class CheckPerformTransactionResult {
  @IsBoolean()
  allow: boolean;

  @IsString()
  code: string;

  @IsString()
  message: string;

  constructor(allow: boolean, code: string, message: string) {
    this.allow = allow;
    this.code = code;
    this.message = message;
  }
}