import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Park } from './park.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkService {
  constructor(
    @InjectRepository(Park)
    private repository: Repository<Park>,
  ) {}
  async save(park: Park): Promise<Park> {
    return this.repository.save(park);
  }

  findAll() {
    return `This action returns all park`;
  }

  findOne(id: number) {
    return `This action returns a #${id} park`;
  }

  remove(id: number) {
    return `This action removes a #${id} park`;
  }
}
