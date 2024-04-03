import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CompaniesModule } from '../companies/companies.module'; // Import the module providing CompanyRepository
import { User } from './entities/user.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { PasswordService } from 'src/password/password.service';
import { Company } from 'src/companies/entities/company.entity';
import { ConfigService } from '@nestjs/config';
 // Import the CompanyRepository

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Company]),
    CompaniesModule, // Import the module providing CompanyRepository
  ],
  controllers: [UsersController],
  providers: [UsersService,CompaniesService,PasswordService,ConfigService], // Add CompanyRepository to the providers array
})
export class UsersModule {}