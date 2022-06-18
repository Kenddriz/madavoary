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
  async count(): Promise<number> {
    return this.repository.count();
  }
  async findAll(): Promise<Area[]> {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  async findOneById(id: number): Promise<Area> {
    return this.repository.findOne(id);
  }

  async findOneByIds(ids: number[]): Promise<Area[]> {
    return this.repository.findByIds(ids);
  }

  async findByLivingBeing(LivingBeingId: number): Promise<Area[]> {
    return this.repository
      .createQueryBuilder('area')
      .innerJoin('localizations', 'loc', 'loc."areaId" = area.id')
      .where('loc."livingBeingId" = :LivingBeingId', { LivingBeingId })
      .orderBy('name', 'ASC')
      .getMany();
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
