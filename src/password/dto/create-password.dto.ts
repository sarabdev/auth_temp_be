import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreatePasswordDto {
  @ApiProperty()
  @IsEmail()
  @Length(1, 45)
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 32)
  password: string;
}
