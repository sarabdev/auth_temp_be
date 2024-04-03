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

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}



 
}
