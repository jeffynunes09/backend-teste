import { Author } from "src/author/entities/author.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";


@Entity()
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