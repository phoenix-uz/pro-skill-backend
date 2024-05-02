import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guad';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Questions', 'Admin')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        answers: { type: 'array', items: { type: 'string' } },
        correctAnswer: { type: 'number' },
        lessonId: { type: 'number' },
      },
    },
  })
  @Post()
  create(@Body() body: CreateQuestionDto) {
    return this.questionsService.create(body);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        answers: { type: 'array', items: { type: 'string' } },
        correctAnswer: { type: 'number' },
        lessonId: { type: 'number' },
      },
    },
  })
  @Patch()
  update(@Body() body: UpdateQuestionDto) {
    return this.questionsService.update(body);
  }
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
