import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = new DocumentBuilder().setTitle('Web block service').build();

  await app.listen(3000);
}
bootstrap();
