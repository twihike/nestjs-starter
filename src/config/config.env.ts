import { IsBoolean, IsIn, IsNumber, IsString } from 'class-validator';

type NODE_ENV = 'development' | 'production' | 'test' | 'provision';

export class EnvConfig {
  @IsIn(['development', 'production', 'test', 'provision'])
  NODE_ENV: NODE_ENV = 'development';

  @IsNumber()
  PORT: number = 3000;

  @IsString()
  TYPEORM_HOST = 'postgres';

  @IsString()
  TYPEORM_USERNAME = 'postgres';

  @IsString()
  TYPEORM_PASSWORD = '';

  @IsString()
  TYPEORM_DATABASE = 'postgres';

  @IsNumber()
  TYPEORM_PORT = 5432;

  @IsBoolean()
  TYPEORM_LOGGING = false;

  @IsString()
  JWT_SECRET: string = '';

  @IsBoolean()
  SKIP_AUTH: boolean = false;

  @IsBoolean()
  SWAGGER_UI: boolean = false;

  @IsBoolean()
  GQL_PLAYGROUND: boolean = false;
}
