import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from 'src/password/password.service';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [  TypeOrmModule.forFeature([User, Company]),
],
  controllers: [CompaniesController],
  providers: [CompaniesService,PasswordService,ConfigService],
})
export class CompaniesModule {}
