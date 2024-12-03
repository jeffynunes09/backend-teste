import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Response } from 'express';
import { UUID } from 'crypto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo autor' })
  @ApiResponse({ status: 201, description: 'Autor criado com sucesso' })
  async create(@Body() createAuthorDto: CreateAuthorDto, @Res() res: Response) {
    try {
      const author = await this.authorService.create(createAuthorDto);
      return res.status(HttpStatus.CREATED).json(author);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao criar autor',
        error: error.message,
      });
    }
  }

  @Get('all')
  @ApiOperation({ summary: 'Buscar todos os autores' })
  @ApiResponse({ status: 200, description: 'Autores encontrados com sucesso' })
  async findAllAuthors(@Res() res: Response) {
    try {
      const authors = await this.authorService.findAllAuthors();
      return res.status(HttpStatus.OK).json(authors);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar autores',
        error: error.message,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor encontrado' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
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
        message: 'Erro ao buscar autor',
        error: error.message,
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar autor' })
  @ApiResponse({ status: 200, description: 'Autor atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  async update(@Param('id') id: UUID, @Body() updateAuthorDto: UpdateAuthorDto, @Res() res: Response) {
    try {
      const updatedAuthor = await this.authorService.update(id, updateAuthorDto);
      if (!updatedAuthor) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Autor não encontrado',
        });
      }
      return res.status(HttpStatus.OK).json(updatedAuthor);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao atualizar autor',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir autor' })
  @ApiResponse({ status: 200, description: 'Autor excluído com sucesso' })
  async remove(@Param('id') id: UUID, @Res() res: Response) {
    try {
      const deletedAuthor = await this.authorService.remove(id);
      if (!deletedAuthor) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Autor não encontrado para excluir',
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Autor excluído com sucesso',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao deletar autor',
        error: error.message,
      });
    }
  }
}
