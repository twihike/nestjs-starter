import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { User } from '../users/users.entity';
import { LoginDto, LoginResult, SignUpDto } from './auth.dto';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  beforeEach(async () => {
    const authServiceMockValue = {
      signUp: () => 'mock',
      login: () => 'mock',
    };
    const AuthServiceMock = {
      provide: AuthService,
      useValue: authServiceMockValue,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, AuthServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signUp', () => {
    it('should call AuthService.signUp', async () => {
      const input: SignUpDto = {
        name: 'a',
        email: 'a@example.com',
        password: 'secret',
      };
      const result = plainToClass(User, {
        id: 1,
        name: 'a',
        email: 'a@example.com',
      });

      const rv = new Promise<User>(resolve => resolve(result));
      const signUp = jest.spyOn(service, 'signUp').mockReturnValue(rv);

      expect(await resolver.signUp(input)).toBe(result);
      expect(signUp.mock.calls[0][0]).toBe(input);

      signUp.mockRestore();
    });
  });

  describe('login', () => {
    describe('when login is successful', () => {
      it('should return token', async () => {
        const input: LoginDto = {
          name: 'a',
          password: 'secret',
        };
        const result = plainToClass(LoginResult, {
          token: 'a',
        });

        const rv = new Promise<LoginResult>(resolve => resolve(result));
        const login = jest.spyOn(service, 'login').mockReturnValue(rv);

        expect(await resolver.login(input)).toBe(result);
        expect(login.mock.calls[0][0]).toBe(input);

        login.mockRestore();
      });
    });

    describe('when login failed', () => {
      it('should throw BadRequestException', async () => {
        const input: LoginDto = {
          name: 'a',
          password: 'secret',
        };
        const result = plainToClass(LoginResult, {
          token: '',
        });

        const rv = new Promise<LoginResult>(resolve => resolve(result));
        const login = jest.spyOn(service, 'login').mockReturnValue(rv);

        const l = resolver.login(input);
        await expect(l).rejects.toThrowError(BadRequestException);
        expect(login.mock.calls[0][0]).toBe(input);

        login.mockRestore();
      });
    });
  });
});
