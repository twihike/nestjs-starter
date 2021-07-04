import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { User } from './users.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const usersServiceMockValue = {
      findAll: () => 'mock',
      findOneByName: () => 'mock',
    };
    const UsersServiceMock = {
      provide: UsersService,
      useValue: usersServiceMockValue,
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'mock' })],
      providers: [UsersResolver, UsersServiceMock],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('users', () => {
    it('should return the users', async () => {
      const result = [
        plainToClass(User, {
          id: 1,
          name: 'a',
          email: 'a@example.com',
        }),
      ];

      const findAll = jest
        .spyOn(service, 'findAll')
        .mockReturnValue(new Promise<User[]>((resolve) => resolve(result)));

      expect(await resolver.users()).toEqual(result);
      expect(findAll.mock.calls).toHaveLength(1);
    });
  });

  describe('user', () => {
    it('should return the user', async () => {
      const input = 'a';
      const result = plainToClass(User, {
        id: 1,
        name: 'a',
        email: 'a@example.com',
      });

      const findOneByName = jest
        .spyOn(service, 'findOneByName')
        .mockReturnValue(new Promise<User>((resolve) => resolve(result)));

      expect(await resolver.user(input)).toEqual(result);
      expect(findOneByName.mock.calls[0][0]).toEqual(input);
    });
  });
});
