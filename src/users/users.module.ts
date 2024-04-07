import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/entities/company.entity';
import { PasswordService } from 'src/password/password.service';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { CompaniesModule } from '../companies/companies.module'; // Import the module providing CompanyRepository
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// Import the CompanyRepository

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, Access, Application, Role]),
    CompaniesModule, // Import the module providing CompanyRepository
  ],
  controllers: [UsersController],
  providers: [UsersService, CompaniesService, PasswordService, ConfigService, RolesService], // Add CompanyRepository to the providers array
})
export class UsersModule { }