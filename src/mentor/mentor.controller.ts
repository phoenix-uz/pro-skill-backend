import { Controller, Post, Body } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Mentor')
@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @ApiBody({
    description: 'Login with admin name and password',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('/login')
  login(@Body() body: { name: string; password: string }) {
    return this.mentorService.login(body.name, body.password);
  }
}
