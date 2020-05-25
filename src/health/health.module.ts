import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { ConfigModule } from '../config/config.module';

import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule, TerminusModule],
})
export class HealthModule {}
