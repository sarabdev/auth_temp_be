import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/Public/Entities/application.entity';
import { Company } from 'src/Public/Entities/company.entity';
import { Role } from 'src/Public/Entities/roles.entity';
import { User } from 'src/Public/Entities/user.entity';
import { Access } from '../Public/Entities/access.entity';
import { UsersService } from 'src/users/users.service';
import { ApplicationsService } from 'src/applications/applications.service';
import { RolesService } from 'src/roles/roles.service';
import { CompaniesService } from 'src/companies/companies.service';
import { PasswordService } from 'src/password/password.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [  TypeOrmModule.forFeature([ User,Company,Access,Application,Role]),
],
  controllers: [AccessController],
  providers: [AccessService,ApplicationsService,RolesService]
})
export class AccessModule {}
