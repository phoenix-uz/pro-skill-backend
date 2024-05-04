import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
}

@ApiTags('click')
@Controller('click')
export class ClickService {
  constructor(private readonly clickService: ClickService) {}
}
