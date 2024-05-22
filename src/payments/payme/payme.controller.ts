// import { Body, Controller, Post, Request } from '@nestjs/common';
// import { ApiBody, ApiTags } from '@nestjs/swagger';

// @ApiTags('Payme')
// @Controller('payme')
// export class PaymeController {
//   constructor(private readonly paymeService: PaymeService) {}

//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         card_number: { type: 'string' },
//         expire_date: { type: 'string' },
//       },
//     },
//   })
//   @Post('card')
//   async createInvoice(
//     @Body() body: { card_number: string; expire_date: string },
//     @Request() req: any,
//   ) {
//     return this.paymeService.createInvoice(body);
//   }
// }
