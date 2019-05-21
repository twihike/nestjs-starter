import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockStrategy } from './mock.strategy';
import { AuthOptionsService } from '../config/auth-options.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { User } from '../users/users.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        // "jsonwebtoken" option to sign
        secret: config.env.JWT_SECRET,
        signOptions: {
          expiresIn: 24 * 60 * 60,
        },
      }),
    }),
    PassportModule.registerAsync({
      inject: [ConfigService],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, JwtStrategy, MockStrategy],
  exports: [AuthService],
})
export class AuthModule {}
