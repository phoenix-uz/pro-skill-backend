import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('Authentications')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string' },
        email: { type: 'string' },
        phoneNumber: { type: 'string' },
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
        phoneNumber: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('login')
  async login(@Body() body: { phoneNumber: string; password: string }) {
    return this.authService.login(body.phoneNumber, body.password);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string' },
      },
    },
  })
  @Post('send-phone-code')
  async sendPhoneCode(@Body() body: { phoneNumber: string }) {
    return this.authService.sendPhoneCode(body.phoneNumber);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string' },
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
        phoneNumber: { type: 'string' },
        newPassword: { type: 'string' },
        code: { type: 'string' },
      },
    },
  })
  @Post('change-password')
  async changePassword(
    @Body() body: { phoneNumber: string; newPassword: string; code: string },
  ) {
    return this.authService.changePassword(
      body.phoneNumber,
      body.newPassword,
      body.code,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  profile(@Request() req: any) {
    return this.authService.getProfile(req.userId);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string' },
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
    return this.authService.update(body, req.userId);
  }
}
