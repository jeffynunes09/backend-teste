import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Nome do autor' })
  name: string;

  @ApiProperty({ description: 'Data de nascimento do autor' })
  birthDate: Date;
}
