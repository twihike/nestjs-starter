import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvConfig } from '../config/config.env';

import { TypeOrmNamingStrategy } from './typeorm-naming-strategy';

const env = plainToClass(
  EnvConfig,
  { ...EnvConfig.getDefaultObject(), ...process.env },
  { enableImplicitConversion: true },
);
const errors = validateSync(env, { whitelist: true });
if (errors.length > 0) {
  // eslint-disable-next-line no-console
  console.error(JSON.stringify(errors, undefined, '  '));
  throw new Error('Invalid env.');
}

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: env.NODE_ENV === 'test' ? ':memory:' : 'db.sqlite3',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  namingStrategy: new TypeOrmNamingStrategy(),
  synchronize: true,
  logging: env.NODE_ENV === 'development',
};

export = options;
