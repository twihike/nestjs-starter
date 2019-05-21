import { Injectable, Logger } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthIndicatorResult,
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly db: TypeOrmHealthIndicator,
    private readonly dns: DNSHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    Logger.debug('Init', this.constructor.name);

    const healthEndpoint: TerminusEndpoint = {
      url: '/healthz',
      healthIndicators: [
        async (): Promise<HealthIndicatorResult> =>
          this.db.pingCheck('database', { timeout: 300 }),
        async (): Promise<HealthIndicatorResult> =>
          this.dns.pingCheck('google', 'https://google.com'),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
