import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
  // @Public()
  // @Roles(Role.SUPER_ADMIN)
  @Roles('Super_Admin')
  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto)
  {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get()
  findAll()
  {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.applicationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto)
  {
    return this.applicationsService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string)
  {
    return this.applicationsService.remove(+id);
  }
}
