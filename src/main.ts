import { NestFactory } from '@nestjs/core';
import { Auth-serviceModule } from './auth-service/auth-service.module';

async function bootstrap() {
  const app = await NestFactory.create(Auth-serviceModule);
  await app.listen(3000);
}
bootstrap();
