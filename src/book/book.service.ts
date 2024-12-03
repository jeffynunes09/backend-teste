import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity'; 
import { UUID } from 'crypto'; 

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}


  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookRepository.create(createBookDto);
      return await this.bookRepository.save(book);
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao criar livro: ${error.message}`);
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      return await this.bookRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao buscar livros: ${error.message}`);
    }
  }

  async findOne(id: UUID): Promise<Book> {
    try {
      const book = await this.bookRepository.findOne({
        where: {
          id: id as any
        },
      });
      if (!book) {
        throw new NotFoundException(`Livro com ID ${id} não encontrado`);
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao buscar livro: ${error.message}`);
    }
  }


  async update(id: UUID, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      const book = await this.findOne(id); 
      if (!book) {
        throw new NotFoundException(`Livro com ID ${id} não encontrado para editar`);
      }

      const updatedBook = this.bookRepository.merge(book, updateBookDto); 
      return await this.bookRepository.save(updatedBook); 
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao atualizar livro: ${error.message}`);
    }
  }

 
  async remove(id: UUID): Promise<string> {
    try {
      const book = await this.findOne(id); 
      if (!book) {
        throw new NotFoundException(`Livro com ID ${id} não encontrado para excluir`);
      }

      await this.bookRepository.delete(id); 
      return `Livro com ID ${id} excluído com sucesso!`;
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao excluir livro: ${error.message}`);
    }
  }
}
