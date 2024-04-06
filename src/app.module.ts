import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { Company } from './companies/entities/company.entity';
import { PasswordModule } from './password/password.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { ApplicationsModule } from './applications/applications.module';
import { Application } from './applications/entities/application.entity';
import { ApplicationsService } from './applications/applications.service';
import { ApplicationSeederModule } from './applications/application.seeder.module';
import { ApplicationSeeder } from './applications/application.seeder';
import { RolesModule } from './roles/roles.module';
import { AccessModule } from './access/access.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) ,
      username: process.env.DATABASE_USERNAME ,
      password: process.env.DATABASE_PASSWORD ,
      database: process.env.DATABASE_NAME ,
      entities: [User, Company,Application],
      synchronize: true,
      
    }),
    TypeOrmModule.forFeature([User, Company,Application]),
    UsersModule,
    CompaniesModule,
    AuthModule,
    PasswordModule,
    ApplicationsModule,
    ApplicationSeederModule,
    RolesModule,
    AccessModule,
  ],
  controllers: [AppController],


  providers: [
    
    ApplicationSeeder,
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

export class AppModule {
  constructor(private readonly applicationSeeder: ApplicationSeeder) {
    this.applicationSeeder.seed();
  }
}

