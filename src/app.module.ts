import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { GqlOptionsService } from './config/gql-options.service';
import { TerminusOptionsService } from './config/terminus-options.service';
import { TypeOrmOptionsService } from './config/typeorm-options.service';
import { DemoModule } from './demo/demo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlOptionsService,
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    AuthModule,
    UsersModule,
    DemoModule,
  ],
})
export class AppModule {}
