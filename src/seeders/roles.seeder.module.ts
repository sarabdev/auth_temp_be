import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { RolesSeederService } from './roles.seeder.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Company,Access,Application,Role])],
  providers: [RolesSeederService],
  exports:[RolesSeederService]
})
export class RolesSeederModule {
}
