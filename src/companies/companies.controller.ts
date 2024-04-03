import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/constants';
import { Role } from 'src/users/entities/user.entity';
@ApiTags('Company')
@ApiBearerAuth()
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Roles(Role.SUPER_ADMIN)
  @Post()
 async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companiesService.create(createCompanyDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get()
  async findAll() {
    return await this.companiesService.findAll();
  }

  @Roles(Role.SUPER_ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companiesService.findOne(+id);
  }

  @Roles(Role.SUPER_ADMIN|| Role.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return await this.companiesService.update(+id, updateCompanyDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companiesService.remove(+id);
  }
}
