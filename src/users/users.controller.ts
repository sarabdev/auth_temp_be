import
{
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/auth/constants';
import { CreateUserDto } from './dto/create-userdto';
import { UsersService } from './users.service';
@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController
{
  constructor(private readonly usersService: UsersService) { }

  // @Roles('Super_Admin')
  @Post('/CreateUserBySuperAdmin/:companyId')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Param('companyId') companyId: number,
  )
  {
    try
    {
      return await this.usersService.createUserBySuperAdmin(
        createUserDto,
        companyId,
      );
    } catch (error)
    {
      throw error;
    }
  }

  // //@Roles(Role.ADMIN)
  // @Post('/CreateUserByAdmin')
  // async createUserByAdmin(@Body() createUserDto: CreateUserDto, @Req() req) {
  //   try {
  //     const companyId = req.user.companyId;
  //     return await this.usersService.createUserByAdmin(
  //       createUserDto,
  //       companyId,
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Roles('Auth_Admin')
  @Post('/CreateUserByAdmin')
  async createUserByAuthAdmin(@Body() createUserDto: CreateUserDto, @Req() req)
  {
    try
    {
      const companyId = req.user.companyId;
      return await this.usersService.createUserByAuthAdmin(
        createUserDto,
        companyId,
      );
    } catch (error)
    {
      throw error;
    }
  }

  @Roles('Super_Admin')
  @Get()
  async findAll()
  {
    try
    {
      return await this.usersService.findAll();
    } catch (error)
    {
      throw error;
    }
  }

  @Roles('Admin')
  @Get('findAllUserByAdmin')
  async findAllByAdmin(@Req() req)
  {
    try
    {
      const companyId = req.user.companyId;

      return await this.usersService.findAllByAdmin(companyId);
    } catch (error)
    {
      throw error;
    }
  }

  @Roles('Auth_Admin')
  @Get('findAllUserByAuth_Admin')
  async findAllByAuth_Admin(@Req() req)
  {
    try
    {
      const companyId = req.user.companyId;

      return await this.usersService.findAllByAuth_Admin(companyId);
    } catch (error)
    {
      throw error;
    }
  }

  @Get('/me')
  async findme(@Req() req)
  {
    try
    {
      return await this.usersService.findOne(req.user.id)
    } catch (error)
    {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    try
    {
      return await this.usersService.findOne(+id);
    } catch (error)
    {
      throw error;
    }
  }
}
