import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GqlOptionsService } from './appoptions/gql-options.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { TypeOrmOptionsService } from './typeorm/typeorm-options.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmOptionsService,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: GqlOptionsService,
    }),
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
