import { ApiProperty } from '@nestjs/swagger';
import
{
  IsEmail,
  IsNotEmpty
} from 'class-validator';
// import { Role } from '../entities/user.entity';
export class CreateAccessDto {

  
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  role_id: number;

  @ApiProperty()
  application_id: number;
}