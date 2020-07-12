import { IsBoolean, IsIn, IsNumber, IsString } from 'class-validator';

type NODE_ENV = 'development' | 'production' | 'test';
type TYPEORM_TYPE = 'auto' | 'sqlite' | 'postgres';

export class EnvConfig {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: NODE_ENV;

  @IsNumber()
  PORT: number;

  @IsIn(['auto', 'sqlite', 'postgres'])
  TYPEORM_TYPE: TYPEORM_TYPE;

  @IsString()
  TYPEORM_HOST: string;

  @IsString()
  TYPEORM_USERNAME: string;

  @IsString()
  TYPEORM_PASSWORD: string;

  @IsString()
  TYPEORM_DATABASE: string;

  @IsNumber()
  TYPEORM_PORT: number;

  @IsBoolean()
  TYPEORM_LOGGING: boolean;

  @IsNumber()
  HEALTH_CHECK_DATABASE_TIMEOUT_MS: number;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRES_IN: number;

  @IsBoolean()
  SKIP_AUTH: boolean;

  @IsBoolean()
  SWAGGER_UI: boolean;

  @IsBoolean()
  GQL_PLAYGROUND: boolean;

  @IsString()
  GQL_SCHEMA_FILE: string;

  static getDefaultObject(): EnvConfig {
    const obj = new EnvConfig();
    obj.NODE_ENV = 'development';
    obj.PORT = 3000;
    obj.TYPEORM_TYPE = 'auto';
    obj.TYPEORM_HOST = 'localhost';
    obj.TYPEORM_USERNAME = 'postgres';
    obj.TYPEORM_PASSWORD = 'postgres';
    obj.TYPEORM_DATABASE = 'postgres';
    obj.TYPEORM_PORT = 5432;
    obj.TYPEORM_LOGGING = false;
    obj.HEALTH_CHECK_DATABASE_TIMEOUT_MS = 3000;
    obj.JWT_SECRET = '';
    obj.JWT_EXPIRES_IN = 86400;
    obj.SKIP_AUTH = false;
    obj.SWAGGER_UI = false;
    obj.GQL_PLAYGROUND = false;
    obj.GQL_SCHEMA_FILE = 'schema.graphql';
    return obj;
  }
}
