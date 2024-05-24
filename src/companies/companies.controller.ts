import {
  Body,
  Controller,
  Delete,
  Get,
  Req,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/auth/constants';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
@ApiTags('Company')
@ApiBearerAuth()
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }
  @Public()
  // @Roles('Super_Admin')
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companiesService.create(createCompanyDto);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Put()
  async edit(@Body() editCompanyDto: any) {
    try {
      return await this.companiesService.edit(editCompanyDto);
    } catch (error) {
      throw error;
    }
  }

  //@Roles(Role.SUPER_ADMIN)
  @Public()
  @Get('findAll')
  async findAll() {
    try {
      return await this.companiesService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('findMyCompany')
  async findMyCompany(@Req() req) {
    try {
      return await this.companiesService.findMyCompanies(req.user.id);
    } catch (error) {
      throw error;
    }
  }
  // @Roles('Super_Admin')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.companiesService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/delete_company/:id')
  async deleteCompany(@Param('id') id: string): Promise<any> {
    return this.companiesService.markAsDeleted(id);
  }


}
