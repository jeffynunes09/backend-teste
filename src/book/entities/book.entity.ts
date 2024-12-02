import { Author } from "src/author/entities/author.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class Book {



    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    title:string;

    @Column()
    publicationDate:Date;

    @ManyToOne(() => Author, (author) =>  author.books )
    author:Author;
}