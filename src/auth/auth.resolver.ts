import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/users.entity';
import { LoginDTO, LoginResult, SignUpDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver(ofUsers => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => User)
  async signUp(@Args('user') user: SignUpDTO): Promise<User> {
    const result = await this.authService.signUp(user);
    return result;
  }

  @Mutation(returns => LoginResult)
  async login(@Args('login') login: LoginDTO): Promise<LoginResult> {
    const result = await this.authService.login(login);
    if (!result.token) {
      throw new BadRequestException();
    }
    return result;
  }
}
