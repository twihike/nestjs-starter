import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import * as postgres from './ormconfig.postgres';
import * as sqlite from './ormconfig.sqlite';

@Injectable()
export class TypeOrmOptionsService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    Logger.debug('Init', this.constructor.name);

    if (
      this.config.env.NODE_ENV === 'development' ||
      this.config.env.NODE_ENV === 'test'
    ) {
      return sqlite;
    }

    if (this.config.env.NODE_ENV === 'production') {
      return postgres;
    }

    throw new Error();
  }
}
