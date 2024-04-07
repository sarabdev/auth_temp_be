import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { SeederService } from './seeder.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Access, Application, Role])],
  providers: [SeederService],
  exports: [SeederService]
})
export class SeederModule
{
}
