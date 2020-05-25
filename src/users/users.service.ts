import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async findOneByName(name: string): Promise<User> {
    const user = await this.userRepo.findOne({ name });
    return user;
  }
}
