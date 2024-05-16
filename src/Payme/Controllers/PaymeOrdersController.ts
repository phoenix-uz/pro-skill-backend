import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class MerchantService {
  private readonly TIME_EXPIRED = 43_200_000

  constructor(private prisma: PrismaService) {}

  async checkPerformTransaction(amount: number, account: { paycomId: string }): Promise<{ result: any }> {
    const order = await this.prisma.CustomerOrder.findUnique({
      where: { paycomId: account.paycomId },
    });

    if (!order) {
      throw new NotFoundException('Order not found', '-31050');
    }

    if (amount !== order.amount) {
      throw new BadRequestException('Wrong amount', '-31001');
    }

    return { result: { allow: true } };
  }

  async createTransaction(id: string, time: Date, amount: number, account: { paycomId: string }): Promise<{ result: any }> {
    const order = await this.prisma.CustomerOrder.findUnique({
      where: { paycomId: account.paycomId },
    });

    if (!order) {
      throw new NotFoundException('Order not found', '-31050');
    }

    let transaction = await this.prisma.OrderTransaction.findFirst({
      where: {
        orderId: order.id,
        paycomId: id,
      },
    })

    if (transaction && transaction.paycomId !== id) {
      throw new BadRequestException('Unable to complete operation', '-31050');
    }

    if (transaction && transaction.orderId && transaction.order.amount !== amount) {
      throw new BadRequestException('Wrong amount', '-31001');
    }

    if (!transaction) {
      const checkResult = await this.checkPerformTransaction(amount, account);
      if (checkResult.result.allow) {
        const newTransaction = await this.prisma.OrderTransaction.create({
          data: {
            paycomId: id,
            paycomTime: time,
            createTime: BigInt(new Date().getTime()),
            state: 'STATE_IN_PROGRESS',
            orderId: order.id,
            performTime: BigInt(0),
            cancelTime: BigInt(0),
          },
        });

        return {
          result: {
            createTime: newTransaction.createTime,
            paycomId: newTransaction.paycomId,
            state: newTransaction.state,
          },
        };
      }
    } else {
      if (transaction.state === 'STATE_IN_PROGRESS') {
        if (new Date().getTime() - transaction.paycomTime.getTime() > this.TIME_EXPIRED) {
          transaction = await this.prisma.OrderTransaction.update({
            where: { id: transaction.id },
            data: { state: 'STATE_CANCELED' },
          });

          throw new BadRequestException('Transaction is timed out.', '-31008');
        } else {
          return {
            result: {
              createTime: transaction.createTime,
              paycomId: transaction.paycomId,
              state: transaction.state,
            },
          };
        }
      } else {
        throw new BadRequestException('Transaction state prevents completion', '-31008');
      }
    }

    throw new BadRequestException('Unable to complete operation', '-31008');
  }

  async ifTransactionCanBePerformed(transaction: any): Promise<void> {
    // Implement your logic for checking stock or other conditions
  }

  async performTransaction(id: string): Promise<{ result: any }> {
    let transaction = await this.prisma.OrderTransaction.findUnique({
      where: { paycomId: id },
      include: { order: true },
    });

    if (!transaction) {
      throw new NotFoundException('Order transaction not found', '-31003');
    }

    if (transaction.state === 'STATE_IN_PROGRESS') {
      if (new Date().getTime() - transaction.paycomTime.getTime() > this.TIME_EXPIRED) {
        transaction = await this.prisma.OrderTransaction.update({
          where: { id: transaction.id },
          data: { state: 'STATE_CANCELED' },
        });

        throw new BadRequestException('Transaction timed out and was canceled', '-31008');
      } else {
        await this.ifTransactionCanBePerformed(transaction);
        transaction = await this.prisma.OrderTransaction.update({
            where: { id: transaction.id },
            data: { state: 'STATE_DONE', performTime: BigInt(new Date().getTime()) },
          });
  
          return {
            result: {
              paycomId: transaction.paycomId,
              performTime: transaction.performTime,
              state: transaction.state,
            },
          };
        }
      } else if (transaction.state === 'STATE_DONE') {
        return {
          result: {
            paycomId: transaction.paycomId,
            performTime: transaction.performTime,
            state: transaction.state,
          },
        };
      } else {
        throw new BadRequestException('Transaction in an invalid state for completion.', '-31008');
      }
    }
  
    async cancelTransaction(id: string, reason: string): Promise<{ result: any }> {
      let transaction = await this.prisma.OrderTransaction.findUnique({
        where: { paycomId: id },
        include: { order: true },
      });
  
      if (!transaction) {
        throw new NotFoundException('Order transaction not found', '-31003');
      }
  
      if (transaction.state === 'STATE_DONE') {
        if (transaction.order && transaction.order.delivered) {
          throw new BadRequestException('Transaction cannot be canceled as the order has been delivered.', '-31007');
        } else {
          transaction = await this.prisma.OrderTransaction.update({
            where: { id: transaction.id },
            data: { state: 'STATE_POST_CANCELED' },
          });
        }
      } else if (transaction.state !== 'STATE_POST_CANCELED') {
        transaction = await this.prisma.OrderTransaction.update({
          where: { id: transaction.id },
          data: { state: 'STATE_CANCELED' },
        });
      }
  
      transaction = await this.prisma.OrderTransaction.update({
        where: { id: transaction.id },
        data: {
          cancelTime: transaction.cancelTime || BigInt(new Date().getTime()),
          reason: reason,
        },
      });
  
      return {
        result: {
          paycomId: transaction.paycomId,
          cancelTime: transaction.cancelTime,
          state: transaction.state,
        },
      };
    }
  
    async checkTransaction(id: string): Promise<{ result: any }> {
      const transaction = await this.prisma.OrderTransaction.findUnique({
        where: { paycomId: id },
      });
  
      if (!transaction) {
        throw new NotFoundException('Order transaction not found', '-31003');
      }
  
      return {
        result: {
          createTime: transaction.createTime,
          performTime: transaction.performTime,
          cancelTime: transaction.cancelTime,
          paycomId: transaction.paycomId,
          state: transaction.state,
          reason: transaction.reason,
        },
      };
    }
  
    async getStatement(from: Date, to: Date): Promise<{ result: any }> {
      const transactions = await this.prisma.OrderTransaction.findMany({
        where: {
          createTime: {
            gte: BigInt(from.getTime()),
            lte: BigInt(to.getTime()),
          },
        },
        include: {
          order: true,
        },
      });
  
      const results = transactions.map(transaction => ({
        paycomId: transaction.paycomId,
        paycomTime: transaction.paycomTime,
        amount: transaction.order ? transaction.order.amount : null,
        account: transaction.order ? { accountId: transaction.orderId?.toString() } : null,
        createTime: transaction.createTime,
        performTime: transaction.performTime,
        cancelTime: transaction.cancelTime,
        transactionId: transaction.id.toString(),
        state: transaction.state,
        reason: transaction.reason,
      }));
  
      return { result: { transactions: results } };
    }
  }