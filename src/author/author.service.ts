// author.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  ) { }

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      const author = this.authorRepository.create(createAuthorDto);
      return this.authorRepository.save(author);
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao criar autor : ${error.message}`)
    }
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

  async findOne(id: UUID): Promise<Author> {
    try {
      const author = await this.authorRepository.findOne({ where: { id }, relations: ['books'] });

      if (!author) {
        throw new NotFoundException(`Autor não encontrado!`)
      }

      return author
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao encontrar autor : ${error.message}`)
    }
  }

  async update(id: UUID, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    try {
      const author = await this.findOne(id)

      if (!author) {
        throw new NotFoundException(`Autor não encontrado!`)
      }

      const updatedAuthor = this.authorRepository.merge({ ...author, ...updateAuthorDto });

      return await this.authorRepository.save(updatedAuthor)
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao editar autor : ${error.message}`)
    }
  }

  async remove(id: UUID) {
    try {
      const author = await this.findOne(id)

      if(!author){
        throw   new NotFoundException(`Autor não encontrado!`)
      }

       await this.authorRepository.delete(id)

      return `Autor  excluido com sucesso!`
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao excluir autor : ${error.message}`)
    }

  }
}
