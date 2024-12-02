// author.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { UUID } from 'crypto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }


  @Get("all")
  findAllAuthors(){
    try {
      return this.authorService.findAllAuthors()
    } catch (error) {
      console.log(error)
    }
  }
  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.authorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: UUID, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.authorService.remove(id);
  }
}
