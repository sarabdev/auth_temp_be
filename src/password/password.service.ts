import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Public/Entities/user.entity';
import { Repository } from 'typeorm';
const saltOrRounds = 10;
@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async updatePassword(email: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hash = await bcrypt.hash(password, 10);
    user.password = hash;

    await this.usersRepository.save(user);

    return 'Password updated successfully';
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, saltOrRounds);
  }
  async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

  generateRandomString(length) {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  createUrl(user: User, hash: string) {
    const url = `${
      this.configService.get('FORGET_PASSWORD_URL') +
      'v1/auth/forget-password-email-link'
    }?hash=${hash}&email=${user.email}`;
    return url;
  }

  createCPasswordUrl(user: User, hash: string) {
    const url = `${this.configService.get('CREATE_PASSWORD_URL')} +
      '/user/user-password/hash='${hash}/email=${user.email}`;
    return url;
  }

  // async createPassword(user: User) {
  //   const hash = this.generateRandomString(7);
  //   const url = this.createCPasswordUrl(user, hash);
  //   const emailValidation = {
  //     type: 'passwordValidation',
  //     hash: hash,
  //     active: false,
  //     userId: user.id,
  //   };
  //   const validate = await this.emailValidationService.create(emailValidation);

  //   if (validate) {
  //    // await this.emailsService.createPassword(user, url);
  //     return { message: 'Create password email sent' , url};
  //   }
  // }

  async forgetPassword(user: User) {
    //   const hash = this.generateRandomString(7);
    //   const url = this.createUrl(user, hash);
    //   const emailValidation = {
    //     type: 'passwordValidation',
    //     hash: hash,
    //     active: false,
    //     userId: user.id,
    //   };
    //   const validate = await this.emailValidationService.create(emailValidation);
    //   if (validate) {
    //     await this.emailsService.forgetPassword(user, url);
    //     return { message: 'forgot password email sent' };
    //   }
  }
}
