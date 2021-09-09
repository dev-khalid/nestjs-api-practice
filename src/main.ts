import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //where-ever there is a validation decorator we don't need to add it all time .instead we add it once at app level.
  await app.listen(3000);
}
bootstrap();
