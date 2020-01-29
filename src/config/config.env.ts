import { IsBoolean, IsIn, IsNumber, IsString } from 'class-validator';

type NODE_ENV = 'development' | 'production' | 'test' | 'provision';

export class EnvConfig {
  @IsIn(['development', 'production', 'test', 'provision'])
  NODE_ENV: NODE_ENV;

  @IsNumber()
  PORT: number;

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

  @IsString()
  JWT_SECRET: string;

  @IsBoolean()
  SKIP_AUTH: boolean;

  @IsBoolean()
  SWAGGER_UI: boolean;

  @IsBoolean()
  GQL_PLAYGROUND: boolean;

  static getDefaultObject(): EnvConfig {
    const obj = new EnvConfig();
    obj.NODE_ENV = 'development';
    obj.PORT = 3000;
    obj.TYPEORM_HOST = 'postgres';
    obj.TYPEORM_USERNAME = 'postgres';
    obj.TYPEORM_PASSWORD = '';
    obj.TYPEORM_DATABASE = 'postgres';
    obj.TYPEORM_PORT = 5432;
    obj.TYPEORM_LOGGING = false;
    obj.JWT_SECRET = '';
    obj.SKIP_AUTH = false;
    obj.SWAGGER_UI = false;
    obj.GQL_PLAYGROUND = false;
    return obj;
  }
}
