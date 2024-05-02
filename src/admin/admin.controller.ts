import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from './admin.guad';

@ApiTags('Admin')
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
  @Post('login')
  login(@Body() body: { name: string; password: string }) {
    return this.adminService.login(body.name, body.password);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get('students-count')
  async getUser() {
    return await this.adminService.getStudentCount();
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get('show-all-users')
  findAll() {
    return this.adminService.findAll();
  }
}
