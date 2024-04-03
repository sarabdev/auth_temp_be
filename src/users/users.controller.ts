import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-userdto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/constants';
import { Role } from './entities/user.entity';
@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.SUPER_ADMIN)
  @Post('/CreateUserBySuperAdmin')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Param('companyId') companyId: number,
  ) {
    return await this.usersService.createUserBySuperAdmin(createUserDto, companyId);
  }


  @Roles(Role.ADMIN)
  @Post('/CreateUserByAdmin')
  async createUserByAdmin(
    @Body() createUserDto: CreateUserDto,
    @Req() req
  ) {
   const companyId= req.user.companyId;
     return await this.usersService.createUserByAdmin(createUserDto, companyId);
  }

  @Get()
 async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }


}
