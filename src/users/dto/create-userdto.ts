import { ApiProperty } from '@nestjs/swagger';
import
{
  IsEmail,
  IsNotEmpty
} from 'class-validator';
// import { Role } from '../entities/user.entity';

export class CreateUserDto
{

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  role_id: number;

  @ApiProperty()
  applicationId: number;
}
