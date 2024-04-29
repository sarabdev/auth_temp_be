import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/Public/Entities/access.entity';
import { Application } from 'src/Public/Entities/application.entity';
import { Company } from 'src/Public/Entities/company.entity';
import { Role } from 'src/Public/Entities/roles.entity';
import { User } from 'src/Public/Entities/user.entity';
import { SeederService } from './seeder.service';
import { UsersService } from 'src/users/users.service';
import { CompaniesService } from 'src/companies/companies.service';
import { PasswordService } from 'src/password/password.service';
import { RolesService } from 'src/roles/roles.service';
import { AccessService } from 'src/access/access.service';
import { ConfigService } from '@nestjs/config';
import { ApplicationsService } from 'src/applications/applications.service';
import Platform from 'src/Public/Entities/platform.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User,Platform, Company, Access, Application, Role])],
  providers: [SeederService,UsersService,CompaniesService,PasswordService,RolesService,AccessService,ConfigService,ApplicationsService],
  exports: [SeederService]
})
export class SeederModule
{
}
