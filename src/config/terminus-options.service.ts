import { Injectable, Logger } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthIndicatorResult,
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from './config.service';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly dns: DNSHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    Logger.debug('Init', this.constructor.name);

    const healthEndpoint: TerminusEndpoint = {
      url: this.config.env.HEALTH_CHECK_URL,
      healthIndicators: [
        async (): Promise<HealthIndicatorResult> =>
          this.db.pingCheck('database', {
            timeout: this.config.env.HEALTH_CHECK_DATABASE_TIMEOUT_MS,
          }),
        async (): Promise<HealthIndicatorResult> =>
          this.dns.pingCheck('google', 'https://google.com'),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
