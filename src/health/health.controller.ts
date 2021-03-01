import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthCheckResult } from '@nestjs/terminus/dist/health-check';

import { ConfigService } from '../config/config.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  readiness(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        this.db.pingCheck('database', {
          timeout: this.config.env.HEALTH_CHECK_DATABASE_TIMEOUT_MS,
        }),
      (): Promise<HealthIndicatorResult> =>
        this.http.pingCheck('google', 'https://google.com'),
    ]);
  }
}
