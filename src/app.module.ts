import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GqlOptionsService } from './appoptions/gql-options.service';
import { TerminusOptionsService } from './appoptions/terminus-options.service';
import { TypeOrmOptionsService } from './appoptions/typeorm-options.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

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
    TerminusModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TerminusOptionsService,
    }),
    AuthModule,
  ],
})
export class AppModule {}
