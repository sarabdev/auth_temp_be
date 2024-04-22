import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/password/password.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { access } from 'fs';
import { Access } from '../access/entities/access.entity';

@Injectable()
export class AuthService {
  constructor(
    private passwordservice: PasswordService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async login(loginDto: LoginUserDto) {
    try {
      //validating email
      const result = await this.userService.findExistingByEmail(loginDto.email);
      if (result) {
        //then validating password after hashing
        const hash = await this.passwordservice.comparePassword(
          loginDto.password,
          result.password,
        );
        //user logging in
        if (hash) {
          return await this.signinUser(result);
        }
        //cant login / error
        else {
          throw new BadRequestException('email/password incorrect');
        }
      }
      //cant login / error
      else {
        throw new BadRequestException('email/password incorrect');
      }
    } catch (error) {
      throw error;
    }
  }

  async signinUser(data) {
    try {
      let rolesArray = data.access.map((element) => element.roles).flat();
      let roleNames = rolesArray.map((role) => role.name);
      let payload;
if(data.company){
       payload = {
        id: data.id,
        userName: data.userName,
        roles: roleNames,
        email: data.email,
        companyId: data.company.id,
      };
    }
    else{
      payload = {
        id: data.id,
        userName: data.userName,
        roles: roleNames,
        email: data.email,
        companyId: 0,
      };
    }
      return {
        access_token: this.jwtService.sign(payload),
        user: data,
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(email: string, password) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) {
        console.log('user', user);

        //   const validations= await this.emailValidationService.verify(user.id);
        // if(validations){
        const results = await this.passwordservice.updatePassword(
          email,
          password,
        );
        return results;
        // }
        // else{
        //   throw new BadRequestException("LINK EXPIRED! Resend the email creation link ");
        // }
      } else {
        throw new BadRequestException('this user does not exists');
      }
    } catch (error) {
      throw error;
    }
  }

  async temporaryForgetPassword(email: string, password) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) {
        const results = await this.passwordservice.updatePassword(
          email,
          password,
        );
        return results;
      } else {
        throw new BadRequestException('this user does not exists');
      }
    } catch (error) {
      throw error;
    }
  }

  async forgetPassword(email: string) {
    try {
      const user = await this.userService.findExistingByEmail(email);
      return await this.passwordservice.forgetPassword(user);
    } catch (error) {
      throw error;
    }
  }

  async verifyCreatePasswordEmail(email: string, hash: string) {
    try {
      //   const user = await this.userService.findExistingByEmail(email);
      //   const verify = await this.prisma.emailValidation.findFirst({
      //     where: { userId: user.id, hash: hash },
      //   });
      //   if (verify) {
      //     const updateValidation = await this.emailValidationService.activate(
      //       verify.id,
      //     );
      //     if (updateValidation) {
      //       return { message: 'validation successful' };
      //     }
      //   } else {
      //     throw new BadRequestException('Unable to find User with this hash');
      //   }
    } catch (err) {
      throw err;
    }
  }

  async verifyForgetPasswordEmail(email: string, hash: string) {
    // try {
    //   const user = await this.userService.findExistingByEmail(email);
    //   const verify = await this.prisma.emailValidation.findFirst({
    //     where: { userId: user.id, hash: hash },
    //   });
    //   if (verify) {
    //     const updateValidation = await this.emailValidationService.activate(
    //       verify.id,
    //     );
    //     if (updateValidation) {
    //       return { message: 'validation successful' };
    //     }
    //   } else {
    //     throw new BadRequestException('Unable to find User with this hash');
    //   }
    // } catch (err) {
    //   throw err;
    // }
  }
}
