import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { LoginDTO, LoginResult, SignUpDTO } from './auth.dto';
import { JwtPayload } from './jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async signUp(user: SignUpDTO): Promise<User> {
    const u = { ...user };
    u.password = AuthService.encryptPassword(u.password);
    const result = await this.usersRepo.save(u);
    return result;
  }

  private static encryptPassword(password): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  async login(login: LoginDTO): Promise<LoginResult> {
    const user = await this.usersService.findOneByName(login.name);
    if (!user) {
      return { token: '' };
    }

    const valid = await bcrypt.compare(login.password, user.password);
    if (!valid) {
      return { token: '' };
    }

    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOneByName(payload.name);
    return user;
  }
}
