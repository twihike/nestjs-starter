import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { User } from '../users/users.entity';
import { UsersModule } from '../users/users.module';

import { AuthOptionsService } from './auth-options.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MockStrategy } from './mock.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        // "jsonwebtoken" option to sign
        secret: config.env.JWT_SECRET,
        signOptions: {
          expiresIn: config.env.JWT_EXPIRES_IN,
        },
      }),
    }),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    ConfigModule, // for JwtStrategy
  ],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, JwtStrategy, MockStrategy],
  exports: [AuthService],
})
export class AuthModule {}
