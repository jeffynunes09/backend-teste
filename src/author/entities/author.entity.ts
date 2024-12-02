import { UUID } from "crypto";
import { Book } from "src/book/entities/book.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Author {


    @PrimaryGeneratedColumn("uuid")
    id:UUID;

    @Column()
    name:String;

    @Column()
    birthDate: Date;

    @OneToMany( () => Book, (book) => book.author)
    books:Book;

}
