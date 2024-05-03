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
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/admin.guard';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Modules', 'Admin')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        time: { type: 'string' },
        courseId: { type: 'number' },
      },
    },
  })
  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        time: { type: 'string' },
        courseId: { type: 'number' },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateModuleDto) {
    return this.modulesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.modulesService.remove(+id);
  }

  @Get('byCourse/:id')
  findByCourseId(@Param('id') id: number) {
    return this.modulesService.findByCourseId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(+id);
  }
}
