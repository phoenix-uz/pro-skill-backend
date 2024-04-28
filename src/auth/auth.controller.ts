import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullname: { type: 'string' },
        email: { type: 'string' },
        phone_number: { type: 'string' },
        phone_number_add: { type: 'string'},
        gender: { type: 'string'},
        city: { type: 'string'},
        dateOfBirth:{ type: 'string'},
        password: { type: 'string' },
      },
    },
  })
  @Post('register')
  async registerUser(
    @Body()
    body: CreateAuthDto,
  ) {
    return this.authService.createUser(body);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone_number: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('login')
  async login(@Body() body: { phone_number: string; password: string }) {
    return this.authService.login(body.phone_number, body.password);
  }

  @Get('cout')
  async getUser() {
    const user = await this.authService.getStudentCount();
    return { conunt: user };
  }

  @Get('show-all')
  findAll() {
    return this.authService.findAll();
  }
  @ApiBody({
    schema: {
      type: 'object',
      properties:{
        fullname: { type: 'string' },
        email: { type: 'string' },
        phone_number: { type: 'string' },
        phone_number_add: { type: 'string'},
        gender: { type: 'string'},
        city: { type: 'string'},
        dateOfBirth:{ type: 'string'},
        password: { type: 'string' },
      }
    }
  })

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Body) {
    return this.authService.update(+id, body);
  }
}
