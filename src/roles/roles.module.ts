import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/Public/Entities/access.entity';
import { Application } from 'src/Public/Entities/application.entity';
import { Company } from 'src/Public/Entities/company.entity';
import { User } from 'src/Public/Entities/user.entity';
import { Role } from 'src/Public/Entities/roles.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([ Company,Access,Application,Role]),
],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
