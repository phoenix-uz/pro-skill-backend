import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CheckService {
  constructor(private readonly prisma: PrismaService) {}

  async check(questions: number[], answers: number[]) {
    if (questions.length !== answers.length) {
      throw new HttpException(
        'Questions and answers should be equal in length',
        HttpStatus.BAD_REQUEST,
      );
    }

    let balls = 0;
    const checked = [];

    for (let index = 0; index < questions.length; index++) {
      const questionId = questions[index];
      const answerId = answers[index];

      try {
        const oneQuestion = await this.prisma.questions.findUnique({
          where: { id: questionId },
        });

        if (!oneQuestion) {
          throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
        }

        const correctAnswer = await this.prisma.answers.findFirst({
          where: { questionId, isCorrect: true },
        });

        if (!correctAnswer) {
          throw new HttpException(
            'Correct answer not found',
            HttpStatus.NOT_FOUND,
          );
        }

        if (correctAnswer.id === answerId) {
          checked.push(true);
          balls++;
        } else {
          checked.push(false);
        }
      } catch (error) {
        // Handle any errors here

        checked.push(false); // Assuming failed questions are marked as incorrect
      }
    }

    return checked;
  }
}
