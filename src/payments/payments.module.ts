import { Module } from '@nestjs/common';
import { ClickService, PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, ClickService],
})
export class PaymentsModule {}
