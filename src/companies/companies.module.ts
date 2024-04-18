import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from 'src/password/password.service';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Role } from 'src/roles/entities/role.entity';
@Module({
  imports: [  TypeOrmModule.forFeature([ Company,Access,Application,Role]),
],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
