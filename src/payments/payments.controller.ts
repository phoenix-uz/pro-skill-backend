import { Controller, Post, Request, Body, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
}

@ApiTags('Click')
@Controller('click')
export class ClickService {
  constructor(private readonly clickService: ClickService) {}
}

