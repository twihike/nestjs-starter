import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';

// eslint-disable-next-line import/namespace
import * as postgres from './ormconfig.postgres';
// eslint-disable-next-line import/namespace
import * as sqlite from './ormconfig.sqlite';
// import sqlite = require('../config/ormconfig.sqlite');
// import postgres = require('../config/ormconfig.postgres');

@Injectable()
export class TypeOrmOptionsService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    Logger.debug('Init', this.constructor.name);

    if (this.config.env.TYPEORM_TYPE === 'auto') {
      if (
        this.config.env.NODE_ENV === 'development' ||
        this.config.env.NODE_ENV === 'test'
      ) {
        return sqlite;
      }
      if (this.config.env.NODE_ENV === 'production') {
        return postgres;
      }
      throw new Error(`Unknown NODE_ENV: ${this.config.env.NODE_ENV}`);
    }

    const ormOptions = {
      sqlite,
      postgres,
    };
    return ormOptions[this.config.env.TYPEORM_TYPE];
  }
}
