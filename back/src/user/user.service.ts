import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }
}
