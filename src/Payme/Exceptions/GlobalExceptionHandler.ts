import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ErrorResponse, ErrorResponseWrapper } from './ErrorResponse';
import { UnableCompleteException } from './UnableCompleteException';
import { WrongAmountException } from './WrongAmountException';
import { TransactionNotFoundException } from './TransactionNotFoundException';
import { OrderNotExistsException } from './OrderNotExistsException';
import { UnableCancelTransactionException } from './UnableCancelTransactionException';

@Catch(UnableCompleteException, WrongAmountException, OrderNotExistsException, TransactionNotFoundException, UnableCancelTransactionException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.OK; // You can adjust the status code based on the exception

    const errorResponse = new ErrorResponse("2.0", exception.code, exception.message, exception.data);
    const errorResponseWrapper = new ErrorResponseWrapper(errorResponse);

    response.status(status).json(errorResponseWrapper);
  }
}