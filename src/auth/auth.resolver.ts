import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/users.entity';
import { LoginDto, LoginResult, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver(of => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => User)
  async signUp(@Args('user') user: SignUpDto): Promise<User> {
    const result = await this.authService.signUp(user);
    return result;
  }

  @Mutation(returns => LoginResult)
  async login(@Args('login') login: LoginDto): Promise<LoginResult> {
    const result = await this.authService.login(login);
    if (!result.token) {
      throw new BadRequestException();
    }
    return result;
  }
}
