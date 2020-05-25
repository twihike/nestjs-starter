import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/gql-auth.guard';

import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [User])
  async users(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async user(@Args('name') name: string): Promise<User> {
    const user = await this.usersService.findOneByName(name);
    return user;
  }
}
