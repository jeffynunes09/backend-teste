import { ApiProperty } from '@nestjs/swagger';
import { Author } from "src/author/entities/author.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("Book")
export class Book {

    @PrimaryGeneratedColumn("uuid")
    @ApiProperty({ description: 'ID único do livro', readOnly: true })
    id: string;  

    @Column()
    @ApiProperty({ description: 'Título do livro' })
    title: string;

    @Column()
    @ApiProperty({ description: 'Data de publicação do livro' })
    publicationDate: Date;

    @ManyToOne(() => Author, (author) => author.books)
    @ApiProperty({ description: 'Autor do livro', type: () => Author })
    author: Author;
}
