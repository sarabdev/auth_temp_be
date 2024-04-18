import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Access')
@ApiBearerAuth()
@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
 async create(@Body() createAccessDto: CreateAccessDto) {
   try {
    return await this.accessService.create(createAccessDto);
   } catch (error) {
    throw error;
   } 
  }

  @Get()
 async  findAll() {
  try{ 
  return await this.accessService.findAll();
  } catch (error) {
    throw error;
   } 
  }

  @Get(':id')
 async  findOne(@Param('id') id: string) {
   try{ 
  return await this.accessService.findOne(+id);
} catch (error) {
  throw error;
 }   
}

}
