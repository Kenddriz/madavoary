import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LivingBeing } from './living-being.entity';
import { Repository } from 'typeorm';
import { PaginateLivingBeingsInput } from './types/living-being.input';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class LivingBeingService {
  constructor(
    @InjectRepository(LivingBeing)
    private repository: Repository<LivingBeing>,
  ) {}
  async save(livingBeing: LivingBeing): Promise<LivingBeing> {
    return this.repository.save(livingBeing);
  }
  async findOneById(id: number): Promise<LivingBeing> {
    return this.repository.findOne({ id });
  }

  async findByName(name: string): Promise<LivingBeing> {
    return this.repository
      .createQueryBuilder('lb')
      .where(':name ILIKE ANY(lb."localNames")', { name })
      .orWhere(':name ILIKE ANY(lb.names)', { name })
      .getOne();
  }
  async findByArea(areaId: number): Promise<LivingBeing[]> {
    return this.repository
      .createQueryBuilder('lb')
      .innerJoin('localizations', 'loc', 'loc."livingBeingId" = lb."id"')
      .where('loc."areaId" = :areaId', { areaId })
      .getMany();
  }
  async paginate(
    input: PaginateLivingBeingsInput,
  ): Promise<Pagination<LivingBeing>> {
    const query = this.repository
      .createQueryBuilder('lb')
      .where(':name ILIKE ANY(lb.names)', { name: input.keyword })
      .orderBy(`lb.${input.sortBy}`, input.order);
    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    return paginate<LivingBeing>(query, options);
  }

  remove(id: number) {
    return `This action removes a #${id} livingBeing`;
  }
}
