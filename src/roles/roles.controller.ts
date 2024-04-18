import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public } from 'src/auth/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { throwError } from 'rxjs';

@ApiTags('roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return await this.rolesService.create(createRoleDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
   try{
    return await this.rolesService.findAll();
  }catch(error){
    throw error;
  }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
    return await this.rolesService.findOne(+id);
    }catch(error){
      throw error;
    }
  }
}
