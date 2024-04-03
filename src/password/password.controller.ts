import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PasswordService } from './password.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Public } from 'src/auth/constants';
@ApiBearerAuth()
@ApiTags('password')
@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  // @Public()
  // @Post("hashPassword")
  // async create(@Body() createPasswordDto: CreatePasswordDto) {
  //   return await this.passwordService.hashPassword(createPasswordDto.password);
  // }

  

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePasswordDto: UpdatePasswordDto,
  // ) {
  //   return this.passwordService.update(+id, updatePasswordDto);
  // }

 
}
