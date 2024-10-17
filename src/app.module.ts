import { Module } from '@nestjs/common';
import { Auth-serviceModule } from './auth-service/auth-service.module';

@Module({
  imports: [Auth-serviceModule],
})
export class AppModule {}
