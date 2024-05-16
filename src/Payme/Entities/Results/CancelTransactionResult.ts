import { IsString, IsNumber } from 'class-validator';

export class CancelTransactionResult {
  @IsString()
  transaction: string;

  @IsNumber()
  cancel_time: number;

  @IsNumber()
  state: number;

  constructor(transaction: string, cancel_time: number, state: number) {
    this.transaction = transaction;
    this.cancel_time = cancel_time;
    this.state = state;
  }
}