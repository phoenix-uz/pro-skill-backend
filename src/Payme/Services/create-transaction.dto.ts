import { Account } from "../Entities/account";

export class CreateTransactionDto {
    id: string;
    time: Date;
    amount: number;
    account: Account; // Define Account type as per your application
  }
  
  export class CreateTransactionResultDto {
    createTime: Date;
    paycomId: string;
    stateCode: number;
  }