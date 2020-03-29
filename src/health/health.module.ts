import { TerminusModule } from '@nestjs/terminus';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule, TerminusModule],
})
export class HealthModule {}
