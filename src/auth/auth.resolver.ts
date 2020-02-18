import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/users.entity';
import { SignInInput, SignInResult, SignUpInput } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver(of => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => User)
  async signUp(@Args('input') input: SignUpInput): Promise<User> {
    const result = await this.authService.signUp(input);
    return result;
  }

  @Mutation(returns => SignInResult)
  async signIn(@Args('input') input: SignInInput): Promise<SignInResult> {
    const result = await this.authService.signIn(input);
    if (!result.token) {
      throw new BadRequestException();
    }
    return result;
  }
}
