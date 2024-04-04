import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePasswordDto } from 'src/password/dto/create-password.dto';
import { ForgetPasswordDto } from 'src/password/dto/forget-password.dto';
import { UpdatePasswordDto } from 'src/password/dto/update-password.dto';
import { PasswordService } from 'src/password/password.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private passwordService: PasswordService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req) {
    try {
      const referer = req.headers.referer;

      const result = await this.authService.login(loginUserDto);
      return { result, referer };
    } catch (error) {
      throw error;
    }
  }

  //   @Public()
  //   @Post('temporaryForgetPassword')
  //  async temporaryForgetPassword(@Body() createPasswordDto: CreatePasswordDto) {
  //     return await this.authService.temporaryForgetPassword(createPasswordDto.email,createPasswordDto.password);
  //   }

  //   @Patch('newpassword/:email')
  //   async updatePassword(
  //     @Param() email: string,
  //     @Body() updatePassDto: UpdatePasswordDto,
  //   ) {
  //     return await this.updatePassword(email, updatePassDto);
  //   }

  //   @Public()
  //   @Post('create-Password')
  //   async createPassword(@Body() createPasswordDto: CreatePasswordDto) {
  //     try {

  //       const result = await this.authService.updatePassword(createPasswordDto.email,createPasswordDto.password);
  //       return result;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }

  //   @Public()
  //   @Post('verify-create-password-email-link/:hash/:email')
  //   async createPasswordEmailLink(
  //     @Param('hash') hash: string,
  //     @Param('email') email: string,
  //   ) {
  //     return await this.authService.verifyCreatePasswordEmail(email, hash);
  //   }

  //   @Public()
  //   @Post('forget-password-email-link')
  //   async forgetPasswordEmailLink(
  //     @Query('hash') hash: string,
  //     @Query('email') email: string,
  //   ) {
  //     return await this.authService.verifyForgetPasswordEmail(email, hash);
  //   }

  //   @Public()
  //   @Post('forget-Password')
  //   async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
  //     try {
  //       const { email } = forgetPasswordDto;
  //       const result = await this.authService.forgetPassword(email);
  //       return result;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
}
