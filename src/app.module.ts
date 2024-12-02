import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { Author } from './author/entities/author.entity';
import { Book } from './book/entities/book.entity';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      
      type: "sqlite",
      database: "library.db",
      entities: [Author,Book],
      synchronize:true

    }),

    BookModule,
    AuthorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
