import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guad';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('Authentications')
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
        phone_number_add: { type: 'string' },
        gender: { type: 'string' },
        city: { type: 'string' },
        birthday: { type: 'string' },
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

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone_number: { type: 'string' },
      },
    },
  })
  @Post('send-phone-code')
  async sendPhoneCode(@Body() body: { phone_number: string }) {
    return this.authService.sendPhoneCode(body.phone_number);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone_number: { type: 'string' },
        code: { type: 'string' },
      },
    },
  })
  @Post('verify-phone-code')
  async verifyPhoneCode(@Body() body: { phone_number: string; code: string }) {
    return this.authService.verifyPhoneCode(body.phone_number, body.code);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone_number: { type: 'string' },
        new_password: { type: 'string' },
        code: { type: 'string' },
      },
    },
  })
  @Post('change-password')
  async changePassword(
    @Body() body: { phone_number: string; new_password: string; code: string },
  ) {
    return this.authService.changePassword(
      body.phone_number,
      body.new_password,
      body.code,
    );
  }

  // @Get('count')
  // async getUser() {
  //   const user = await this.authService.getStudentCount();
  //   return { conunt: user };
  // }
  // @Get('show-all')
  // findAll() {
  //   return this.authService.findAll();
  // }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  profile(@Request() req: any) {
    return this.authService.getProfile(req.user_id);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullname: { type: 'string' },
        email: { type: 'string' },
        gender: { type: 'string' },
        city: { type: 'string' },
        birthday: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Patch('update')
  update(@Body() body: UpdateAuthDto, @Request() req: any) {
    return this.authService.update(body, req.user_id);
  }
}
