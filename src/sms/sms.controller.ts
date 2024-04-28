import { Controller, Get, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmsDto } from './dto/create-sms.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Sms')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        surname: { type: 'string' },
        phone_number: { type: 'string' },
        sms: { type: 'string' },
      },
    },
  })
  @Post()
  async registerUser(
    @Body()
    body: CreateSmsDto,
  ) {
    return this.smsService.create(body);
  }

  @Get()
  findAll() {
    return this.smsService.findAll();
  }
}
