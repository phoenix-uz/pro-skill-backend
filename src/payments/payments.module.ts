import { Module } from '@nestjs/common';
import { ClickService, PaymentsService } from './payments.service';
import { ClickController, PaymentsController } from './payments.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PaymentsController, ClickController],
  providers: [PaymentsService, ClickService, PrismaService],
})
export class PaymentsModule {}
