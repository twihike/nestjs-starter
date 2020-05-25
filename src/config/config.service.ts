import { Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvConfig } from './config.env';

@Injectable()
export class ConfigService {
  readonly env!: EnvConfig;

  constructor() {
    Logger.debug('Init', this.constructor.name);

    const env = plainToClass(
      EnvConfig,
      { ...EnvConfig.getDefaultObject(), ...process.env },
      { enableImplicitConversion: true },
    );
    const errors = validateSync(env, { whitelist: true });
    if (errors.length > 0) {
      const errmsg = JSON.stringify(errors, undefined, '  ');
      Logger.error(errmsg, this.constructor.name);
      throw new Error('Invalid env.');
    }

    if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
      if (!env.JWT_SECRET) {
        env.JWT_SECRET = 'default';
      }
      env.SWAGGER_UI = true;
      env.GQL_PLAYGROUND = true;
    }

    this.env = env;
  }
}
