import { Injectable, Logger } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

import { ConfigService } from '../config/config.service';

@Injectable()
export class GqlOptionsService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createGqlOptions(): GqlModuleOptions {
    Logger.debug('Init', this.constructor.name);

    return {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      context: ({ req }) => ({ req }),
      autoSchemaFile: this.config.env.GQL_SCHEMA_FILE,
      playground: this.config.env.GQL_PLAYGROUND,
      debug: this.config.env.NODE_ENV !== 'production',
    };
  }
}
