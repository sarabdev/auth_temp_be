import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-userdto';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
