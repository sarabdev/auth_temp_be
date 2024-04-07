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
import { Public } from 'src/auth/constants';
import { CreateUserDto } from './dto/create-userdto';
import { UsersService } from './users.service';
@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController
{
  constructor(private readonly usersService: UsersService) { }

  @Public()
  //@Roles(Role.SUPER_ADMIN)
  @Post('/CreateUserBySuperAdmin')
  async create(
    @Body() createUserDto: CreateUserDto[],
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

  //@Roles(Role.AUTH_ADMIN)
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

  //@Roles(Role.SUPER_ADMIN)
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

  //@Roles(Role.ADMIN)
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

  @Get('/me')
  async findme(@Req() req)
  {
    try
    {
      return req.user;
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
