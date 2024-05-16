import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { GetStatementResult } from './Results/GetStatementResult';


export class Transactions {
  @ValidateNested({ each: true })
  @Type(() => GetStatementResult)
  transactions: GetStatementResult[];

  constructor(transactions: GetStatementResult[] = []) {
    this.transactions = transactions;
  }
}