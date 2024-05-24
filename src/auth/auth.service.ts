import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/password/password.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { access } from 'fs';
import { Access } from '../Public/Entities/access.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private passwordservice: PasswordService,
    private jwtService: JwtService,
    private userService: UsersService,

  ) { }
  async login(loginDto: LoginUserDto) {
    try {
      //validating email
      const result = await this.userService.findExistingByEmail(loginDto.email);
      console.log("result", result);

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

      let rolesArray = data.access.map((element) => element.role).flat();
      let roleNames = rolesArray.map((role) => role.name);
      let payload;
      if (data.company) {
        payload = {
          id: data.id,
          sub: data.id,
          userName: data.userName,
          roles: roleNames,
          email: data.email,
          companyId: data.company.id,
        };
      }
      else {
        payload = {
          id: data.id,
          sub: data.id,

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


  async sendPasswordResetEmail(createResetDto: any) {
    try {
      const { email } = createResetDto;
      const user = await this.userService.findByEmail(email)
      console.log(user)
      if (user == null) {
        return { error: true, message: "User does not exist with this email." }
      }

      const resetToken = await this.userService.generateResetToken(email);

      const transporter = nodemailer.createTransport({
        service: 'Gmail', // or any other email service
        auth: {
          user: 'mirzaabubakr999@gmail.com',
          pass: 'efprbewlfhsnciwo',
        },
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Please use the following token to reset your password: ${resetToken}`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException('Error sending password reset email');
    }
  }
}
