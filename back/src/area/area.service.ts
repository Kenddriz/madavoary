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

  async findAll(): Promise<Area[]> {
    return this.repository.find({ order: { name: 'ASC' } });
  }

  async findOneById(id: number): Promise<Area> {
    return this.repository.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
