// author.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { UUID } from 'crypto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
   try {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
   } catch (error) {
    throw new InternalServerErrorException(`Erro ao criar autor : ${error.message}`)   }
  }

  findAllAuthors(): Promise<Author[]> {

    try {

      return this.authorRepository.find()

    } catch (error) {
      
      throw new InternalServerErrorException(`Erro ao encontrar autores : ${error.message}`)
    }
  }

  findAll(): Promise<Author[]> {
   try {
    return this.authorRepository.find({ relations: ['books'] }); 
   } catch (error) {
    throw new InternalServerErrorException(`Erro ao encontrar autores : ${error.message}`)
   }
  }

  findOne(id: UUID): Promise<Author> {
    try {
      return this.authorRepository.findOne({ where: { id }, relations: ['books'] });
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao encontrar autor : ${error.message}`)
    }
  }

  async update(id: UUID, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    try {
      await this.authorRepository.update(id, updateAuthorDto);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao editar autor : ${error.message}`)
    }
  }

   async remove(id: UUID) {
    try {
      const author = await this.authorRepository.delete(id)
      return `Autor  excluido com sucesso!`
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao excluir autor : ${error.message}`)
    }
 
  }
}
