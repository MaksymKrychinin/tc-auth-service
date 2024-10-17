import { Module } from '@nestjs/common';
import { Auth-serviceService } from './services/auth-service.service';
import { Auth-serviceController } from './controllers/auth-service.controller';

@Module({
  controllers: [Auth-serviceController],
  providers: [Auth-serviceService],
})
export class Auth-serviceModule {}
