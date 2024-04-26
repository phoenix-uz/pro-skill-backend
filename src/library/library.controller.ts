import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import {ApiBody,ApiTags} from '@nestjs/swagger'

@ApiTags('Library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}
@ApiBody(
  {
    schema:{
      type:'object',
      properties:{
        name: {type:'string'}
      }
    }
  }
)
  @Post('/')
  async registerUser(
    @Body() 
    body: CreateLibraryDto,
  )
  {
    return this.libraryService.createItem(body);
  }

  
}
