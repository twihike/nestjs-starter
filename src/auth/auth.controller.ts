import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/users.entity';
import { LoginDTO, LoginResult, SignUpDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUp: SignUpDTO): Promise<User> {
    const user = await this.authService.signUp(signUp);
    return user;
  }

  @Post('login')
  async login(@Body() login: LoginDTO): Promise<LoginResult> {
    const result = await this.authService.login(login);
    if (!result.token) {
      throw new BadRequestException();
    }
    return result;
  }
}
