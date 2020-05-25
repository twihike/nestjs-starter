import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../users/users.entity';

import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in-input.dto';
import { SignInResult } from './dto/sign-in-result.dto';
import { SignUpInput } from './dto/sign-up-input.dto';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => User)
  async signUp(@Args('input') input: SignUpInput): Promise<User> {
    const result = await this.authService.signUp(input);
    return result;
  }

  @Mutation((returns) => SignInResult)
  async signIn(@Args('input') input: SignInInput): Promise<SignInResult> {
    const result = await this.authService.signIn(input);
    if (!result.token) {
      throw new BadRequestException();
    }
    return result;
  }
}
