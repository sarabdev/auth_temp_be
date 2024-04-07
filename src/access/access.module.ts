import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/applications/entities/application.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Access } from './entities/access.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([User, Company,Access,Application,Role]),
],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
