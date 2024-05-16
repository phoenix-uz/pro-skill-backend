import { Module } from '@nestjs/common';
import { OrderNotExistsException } from './OrderNotExistsException';
import { TransactionNotFoundException } from './TransactionNotFoundException';
import { UnableCancelTransactionException } from './UnableCancelTransactionException';
import { UnableCompleteException } from './UnableCompleteException';
import { GlobalExceptionFilter } from './GlobalExceptionHandler';
import { WrongAmountException } from './WrongAmountException';
import { ErrorResponse } from './ErrorResponse';


@Module({
  providers: [
    OrderNotExistsException,
    TransactionNotFoundException,
    UnableCancelTransactionException,
    UnableCompleteException,
    GlobalExceptionFilter,
    ErrorResponse,
    WrongAmountException

  ],
  exports: [
    OrderNotExistsException,
    TransactionNotFoundException,
    UnableCancelTransactionException,
    UnableCompleteException,
    GlobalExceptionFilter,
    ErrorResponse,
    WrongAmountException
  ],
})
export class ExceptionsModule {}