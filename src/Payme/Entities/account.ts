import { IsString } from 'class-validator';

export class Account {
  @IsString()
  account: string;

  constructor(account?: string) {
    this.account = account;
  }
}