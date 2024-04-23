import { Body, Controller, Req,Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/constants';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('Applications')
@ApiBearerAuth()
@Controller('applications')
export class ApplicationsController
{
  constructor(private readonly applicationsService: ApplicationsService) { }

  @Roles('Super_Admin')
  @Post()
  async create(@Body() createApplicationDto: CreateApplicationDto)
  {
    try{
    return await this.applicationsService.create(createApplicationDto);
  } catch (error) {
    throw error;
   } 
  }

  @Get()
 async findAll()
  {
  try{
    return await this.applicationsService.findAll();
  } catch (error) {
    throw error;
   } 
}

@Get('findMyApplications')
  async findMyApplications(@Req() req)
  {
    try{
    return await this.applicationsService.findMyApplications(req.user.id);
  } catch (error) {
    throw error;
   } 
  }

  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    try{
    return await this.applicationsService.findOne(+id);
  } catch (error) {
    throw error;
   } 
  }

  
}
