import { Controller, Post, Body } from '@nestjs/common';
import { CheckService } from './check.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Check')
@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        questions: { type: 'array', items: { type: 'number' } },
        answers: { type: 'array', items: { type: 'number' } },
      },
    },
  })
  @Post()
  create(@Body() body: { questions: number[]; answers: number[] }) {
    return this.checkService.check(body.questions, body.answers);
  }
}
