import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { User } from '../users/users.entity';
import { AuthController } from './auth.controller';
import { LoginDto, LoginResult, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;
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
      controllers: [AuthController],
      providers: [AuthServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      expect(await controller.signUp(input)).toBe(result);
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

        expect(await controller.login(input)).toBe(result);
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

        const l = controller.login(input);
        await expect(l).rejects.toThrowError(BadRequestException);
        expect(login.mock.calls[0][0]).toBe(input);

        login.mockRestore();
      });
    });
  });
});
