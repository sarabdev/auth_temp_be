import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
// import { Role } from '../entities/user.entity';
import { PasswordController } from '../../password/password.controller';

export class CreateUserDto {
 
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
 
  @IsNotEmpty()
  @ApiProperty()
  userName: string;
 
  @IsNotEmpty()
  @ApiProperty()
  password:string;

  // @ApiProperty()
  // @IsEnum(Role)
  // roles: Role;

  @ApiProperty()
  applicationId:number;
}
