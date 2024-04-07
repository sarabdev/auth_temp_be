import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from './access/access.module';
import { Access } from './access/entities/access.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';
import { ApplicationsService } from './applications/applications.service';
import { Application } from './applications/entities/application.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/entities/company.entity';
import { PasswordModule } from './password/password.module';
import { Role } from './roles/entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { SeederModule } from './seeders/seeder.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Company, Application, Access, Role],
      synchronize: true,

    }),
    TypeOrmModule.forFeature([User, Company, Application, Access, Role]),
    UsersModule,
    CompaniesModule,
    AuthModule,
    PasswordModule,
    ApplicationsModule,
    RolesModule,
    AccessModule,
    SeederModule
  ],
  controllers: [AppController],


  providers: [
    ApplicationsService,
    AppService,
    ConfigService,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})

export class AppModule
{ }
