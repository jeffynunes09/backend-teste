import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Response } from 'express';
import { UUID } from 'crypto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    try {
      const book = await this.bookService.create(createBookDto);
      return res.status(HttpStatus.CREATED).json(book);
    } catch (error) {
      console.error('Erro ao criar livro : ', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao criar livro :',
        error: error.message,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const books = await this.bookService.findAll();
      return res.status(HttpStatus.OK).json(books);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar livros',
        error: error.message,
      });
    }
  }

  @Get(':id')
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
      console.error('Erro ao buscar livro:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar livro',
        error: error.message,
      });
    }
  }

  @Put(':id')
  async update(@Param('id') id: UUID, @Body() updateBookDto: UpdateBookDto, @Res() res: Response) {
    try {
      const updatedBook = await this.bookService.update(id, updateBookDto); 
      if (!updatedBook) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Livro não encontrado para editar',
        });
      }
      return res.status(HttpStatus.OK).json(updatedBook);
    } catch (error) {
      console.error('Erro ao editar livro:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao editar livro:',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: UUID, @Res() res: Response) {
    try {
      const deletedBook = await this.bookService.remove(id); 
      if (!deletedBook) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Livro não encontrado para deletar',
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Livro excluído com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao deletar livro',
        error: error.message,
      });
    }
  }
}
