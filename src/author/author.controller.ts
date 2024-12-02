import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Response } from 'express'; 
import { UUID } from 'crypto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto, @Res() res: Response) {
    try {
      const author = await this.authorService.create(createAuthorDto);
      return res.status(HttpStatus.CREATED).json(author);
    } catch (error) {
      console.error('Erro ao criar autor : ', error);  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao criar autor :',
        error: error.message,
      });
    }
  }

  @Get('all')
  async findAllAuthors(@Res() res: Response) {
    try {
      const authors = await this.authorService.findAllAuthors();
      return res.status(HttpStatus.OK).json(authors);
    } catch (error) {
      console.error('Erro ao buscar autores:', error);  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar autores',
        error: error.message,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const authors = await this.authorService.findAll();
      return res.status(HttpStatus.OK).json(authors);
    } catch (error) {
      console.error('Erro ao buscar autores:', error);  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar autores',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: UUID, @Res() res: Response) {  
    try {
      const author = await this.authorService.findOne(id);
      if (!author) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Autor não encontrado',
        });
      }
      return res.status(HttpStatus.OK).json(author);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Autor não encontrado',
        error: error.message,
      });
    }
  }

  @Put(':id')
  async update(@Param('id') id: UUID, @Body() updateAuthorDto: UpdateAuthorDto, @Res() res: Response) {  
    try {
      const updatedAuthor = await this.authorService.update(id, updateAuthorDto);
      if (!updatedAuthor) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Autor não encontrado!',
        });
      }
      return res.status(HttpStatus.OK).json(updatedAuthor);
    } catch (error) {
      console.error('Erro ao editar autor:', error);  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao editar autor:',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: UUID, @Res() res: Response) { 
    try {
      const deletedAuthor = await this.authorService.remove(id);
      if (!deletedAuthor) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Autor não encontrado!',
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Autor excluido com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao deletar autor:', error);  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao deletar autor',
        error: error.message,
      });
    }
  }
}
