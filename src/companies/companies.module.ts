import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from '../Public/Entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from 'src/password/password.service';
import { User } from 'src/Public/Entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Access } from 'src/Public/Entities/access.entity';
import { Application } from 'src/Public/Entities/application.entity';
import { Role } from 'src/Public/Entities/roles.entity';
import { ApplicationsService } from 'src/applications/applications.service';
@Module({
  imports: [  TypeOrmModule.forFeature([ Company,Access,Application,Role]),
],
  controllers: [CompaniesController],
  providers: [CompaniesService,ApplicationsService],
})
export class CompaniesModule {}
