import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @ApiProperty({ description: 'Nome do autor (opcional)', required: false })
  name?: string;

  @ApiProperty({ description: 'Data de nascimento do autor (opcional)', required: false })
  birthDate?: Date;
}
