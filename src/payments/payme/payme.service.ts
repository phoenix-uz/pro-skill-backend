// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';
// import getPaymeHeaders from './functions';

// @Injectable()
// export class PaymentsService {
//   constructor(private readonly prisma: PrismaService) {}

//   async cardsCreate(userId: number, card_number: string, expire_date: string) {
//     const response = await fetch(`${process.env.PAYME_MERCHANT_URL}`, {
//       method: 'POST',
//       headers: await getPaymeHeaders(),
//       body: JSON.stringify({
//         id: merchant_id,
//         method: 'cards.create',
//         params: {
//           card: { number: card_number, expire: expire_date },
//           save: false,
//         },
//       }),
//     }).catch((error) => {
//       return error;
//     });
//     const data = await response.json();
//     await this.prisma.paymeCardTokens.create({
//       data: {
//         card_number: card_number,
//         expire_date: expire_date,
//         token: data.result.token,
//       },
//     });
//     return data;
//   }
// }
