import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LivingBeing } from './living-being.entity';
import { Brackets, Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all livingBeing`;
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
  async paginateLb(
    input: PaginateLivingBeingsInput,
  ): Promise<Pagination<LivingBeing>> {
    const query = this.repository.createQueryBuilder('lb');
    const name = input.keyword;
    if (input.areaId > 0)
      query.innerJoin('localizations', 'loc', 'loc."livingBeingsId" = lb.id');
    if (input.keyword) {
      query.where(
        new Brackets((qb) => {
          qb.where(':name ILIKE ANY(lb."localNames")', { name }).orWhere(
            ':name ILIKE ANY(lb.names)',
            { name },
          );
        }),
      );
    }
    if (input.areaId > 0)
      query.andWhere('loc."areaId" = :areaId', { areaId: input.areaId });
    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    query.orderBy('lb."createdAt"', 'DESC');
    return paginate<LivingBeing>(query, options);
  }

  remove(id: number) {
    return `This action removes a #${id} livingBeing`;
  }
}
