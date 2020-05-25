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
  type: 'postgres',
  host: env.TYPEORM_HOST,
  port: env.TYPEORM_PORT,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  namingStrategy: new TypeOrmNamingStrategy(),
  logging: env.TYPEORM_LOGGING,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = options;
