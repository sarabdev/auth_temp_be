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
import { AccessService } from '../access/access.service';
import { ApplicationsService } from 'src/applications/applications.service';
// Import the CompanyRepository

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Access, Application, Role])],
  controllers: [UsersController],
  providers: [UsersService,  PasswordService,AccessService, ConfigService, RolesService,CompaniesService,ApplicationsService], 
})
export class UsersModule { }