import { ApiProperty } from '@nestjs/swagger';


export class CreateBookDto {

    @ApiProperty({ description: 'Título do livro' })
 
    title: string;

    @ApiProperty({ description: 'Data de publicação do livro' })
 
    publicationDate: Date;

    @ApiProperty({ description: 'ID do autor do livro', type: String })
    authorId: string; 
}
