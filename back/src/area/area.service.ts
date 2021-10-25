import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private repository: Repository<Area>,
  ) {}
  async save(area: Area): Promise<Area> {
    return this.repository.save(area);
  }

  findAll() {
    return `This action returns all area`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
