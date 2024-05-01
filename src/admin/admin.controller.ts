import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
    return this.adminService.login(body.name, body.password);
  }
}
