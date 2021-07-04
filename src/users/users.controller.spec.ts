import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let controller: UsersController;
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
      controllers: [UsersController],
      providers: [UsersServiceMock],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const findAll = jest
        .spyOn(service, 'findAll')
        .mockReturnValue(new Promise<User[]>((resolve) => resolve(result)));

      expect(await controller.findAll()).toEqual(result);
      expect(findAll.mock.calls).toHaveLength(1);
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

      const findOneByName = jest
        .spyOn(service, 'findOneByName')
        .mockReturnValue(new Promise<User>((resolve) => resolve(result)));

      expect(await controller.findOneByName(input)).toEqual(result);
      expect(findOneByName.mock.calls[0][0]).toEqual(input);
    });
  });
});
