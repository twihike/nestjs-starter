import { Injectable } from '@nestjs/common';
import { AuthModuleOptions, AuthOptionsFactory } from '@nestjs/passport';
import { ConfigService } from './config.service';

@Injectable()
export class AuthOptionsService implements AuthOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createAuthOptions(): AuthModuleOptions {
    return {
      defaultStrategy: this.config.env.SKIP_AUTH ? 'mock' : 'jwt',
    };
  }
}
