import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const usersRepoMockValue = {
      find: () => 'mock',
      findOne: () => 'mock',
    };
    const UsersRepoMock = {
      provide: 'UserRepository',
      useValue: usersRepoMockValue,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepoMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return the users', async () => {
      const result = [
        plainToClass(User, {
          id: 1,
          name: 'a',
          email: 'a@example.com',
        }),
      ];

      const find = jest
        .spyOn(repo, 'find')
        .mockReturnValue(new Promise<User[]>((resolve) => resolve(result)));

      expect(await service.findAll()).toEqual(result);
      expect(find.mock.calls).toHaveLength(1);
    });
  });

  describe('findOneByName', () => {
    it('should return the user', async () => {
      const input = 'a';
      const result = plainToClass(User, {
        id: 1,
        name: 'a',
        email: 'a@example.com',
      });

      const findOne = jest
        .spyOn(repo, 'findOne')
        .mockReturnValue(new Promise<User>((resolve) => resolve(result)));

      expect(await service.findOneByName(input)).toEqual(result);
      const param = { name: input };
      expect(findOne.mock.calls[0][0]).toEqual(param);
    });
  });
});
