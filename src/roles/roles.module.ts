import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([ Company,Access,Application,Role]),
],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
