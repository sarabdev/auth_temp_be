
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';
import { AuthService } from 'src/auth/auth.service';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Company, Access, Application, Role])],
  controllers: [PasswordController],
  providers: [PasswordService, ConfigService],
})
export class PasswordModule { }
