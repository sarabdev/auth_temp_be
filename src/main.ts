import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeederService } from './seeders/seeder.service';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule);
  if (process.argv.includes('--seed'))
  {
    const seeder = app.get(SeederService);
    await seeder.seed();
    await app.close();
    process.exit(0);
  }
  //controller validation
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Global Auth Api')
    .setDescription('...')
    .setVersion('1.0')
    .addBearerAuth()
    //.addTag('main-tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();