import { ApiProperty } from '@nestjs/swagger';
import
{
  IsArray,
  IsEmail,
  IsNotEmpty,
  ValidateNested
} from 'class-validator';
// import { Role } from '../entities/user.entity';

class UserObject {
  @IsNotEmpty()
  @ApiProperty()
  role_id: number;

  @IsNotEmpty()
  @ApiProperty()
  application_id: number;
}


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

  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ type: [UserObject] })
  access: UserObject[];
  
}
