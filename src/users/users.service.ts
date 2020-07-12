import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.find();
    return users;
  }

  async findOneByName(name: string): Promise<User> {
    const user = await this.usersRepo.findOne({ name });
    return user;
  }
}
