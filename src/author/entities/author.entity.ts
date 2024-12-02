import { ApiProperty } from '@nestjs/swagger';
import { UUID } from "crypto";
import { Book } from "src/book/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Author")
export class Author {

  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: 'ID único do autor', readOnly: true })
  id: UUID;

  @Column()
  @ApiProperty({ description: 'Nome do autor' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Data de nascimento do autor' })
  birthDate: Date;

  @OneToMany(() => Book, (book) => book.author)
  @ApiProperty({ description: 'Livros do autor', type: [Book] })
  books: Book[];
}
