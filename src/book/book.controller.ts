import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Response } from 'express';
import { UUID } from 'crypto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('books')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso' })
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    try {
      const book = await this.bookService.create(createBookDto);
      return res.status(HttpStatus.CREATED).json(book);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao criar livro',
        error: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os livros' })
  @ApiResponse({ status: 200, description: 'Livros encontrados com sucesso' })
  async findAll(@Res() res: Response) {
    try {
      const books = await this.bookService.findAll();
      return res.status(HttpStatus.OK).json(books);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar livros',
        error: error.message,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar livro por ID' })
  @ApiResponse({ status: 200, description: 'Livro encontrado' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  async findOne(@Param('id') id: UUID, @Res() res: Response) {
    try {
      const book = await this.bookService.findOne(id);
      if (!book) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Livro não encontrado',
        });
      }
      return res.status(HttpStatus.OK).json(book);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar livro',
        error: error.message,
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar livro' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  async update(@Param('id') id: UUID, @Body() updateBookDto: UpdateBookDto, @Res() res: Response) {
    try {
      const updatedBook = await this.bookService.update(id, updateBookDto);
      if (!updatedBook) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Livro não encontrado',
        });
      }
      return res.status(HttpStatus.OK).json(updatedBook);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao atualizar livro',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir livro' })
  @ApiResponse({ status: 200, description: 'Livro excluído com sucesso' })
  async remove(@Param('id') id: UUID, @Res() res: Response) {
    try {
      const deletedBook = await this.bookService.remove(id);
      if (!deletedBook) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Livro não encontrado para excluir',
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Livro excluído com sucesso',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao deletar livro',
        error: error.message,
      });
    }
  }
}
