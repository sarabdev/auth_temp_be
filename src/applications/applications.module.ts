import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/access/entities/access.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Application } from './entities/application.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([ Company,Access,Application,Role]),
],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
