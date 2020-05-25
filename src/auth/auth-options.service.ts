import { Injectable, Logger } from '@nestjs/common';
import { AuthModuleOptions, AuthOptionsFactory } from '@nestjs/passport';

import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthOptionsService implements AuthOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createAuthOptions(): AuthModuleOptions {
    Logger.debug('Init', this.constructor.name);

    return {
      defaultStrategy: this.config.env.SKIP_AUTH ? 'mock' : 'jwt',
    };
  }
}
