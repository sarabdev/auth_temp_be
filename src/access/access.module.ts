import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/applications/entities/application.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Access } from './entities/access.entity';
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
