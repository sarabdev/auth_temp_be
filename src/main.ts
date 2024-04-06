import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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