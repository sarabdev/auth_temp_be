import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/entities/company.entity';
import { PasswordService } from 'src/password/password.service';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AccessService } from 'src/access/access.service';
import { ApplicationsService } from 'src/applications/applications.service';
import { CompaniesModule } from 'src/companies/companies.module';
@Module({
  imports: [

    TypeOrmModule.forFeature([ User,Company, Access, Application, Role]),
    UsersModule,
    PassportModule,
    CompaniesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PasswordService,UsersService,ConfigService,
    ApplicationsService,
    CompaniesService,RolesService,AccessService
  ],
  exports: [AuthService],
})
export class AuthModule { }
