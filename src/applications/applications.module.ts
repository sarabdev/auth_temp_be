import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/Public/Entities/access.entity';
import { Company } from 'src/Public/Entities/company.entity';
import { Role } from 'src/Public/Entities/roles.entity';
import { User } from 'src/Public/Entities/user.entity';
import { Application } from '../Public/Entities/application.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([ Company,Access,Application,Role]),
],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
