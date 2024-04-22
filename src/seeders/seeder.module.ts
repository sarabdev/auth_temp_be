import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { SeederService } from './seeder.service';
import { UsersService } from 'src/users/users.service';
import { CompaniesService } from 'src/companies/companies.service';
import { PasswordService } from 'src/password/password.service';
import { RolesService } from 'src/roles/roles.service';
import { AccessService } from 'src/access/access.service';
import { ConfigService } from '@nestjs/config';
import { ApplicationsService } from 'src/applications/applications.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Access, Application, Role])],
  providers: [SeederService,UsersService,CompaniesService,PasswordService,RolesService,AccessService,ConfigService,ApplicationsService],
  exports: [SeederService]
})
export class SeederModule
{
}
