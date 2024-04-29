
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/Public/Entities/access.entity';
import { Application } from 'src/Public/Entities/application.entity';
import { AuthService } from 'src/auth/auth.service';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/Public/Entities/company.entity';
import { Role } from 'src/Public/Entities/roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/Public/Entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Company, Access, Application, Role])],
  controllers: [PasswordController],
  providers: [PasswordService, ConfigService],
})
export class PasswordModule { }
