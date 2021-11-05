import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LivingBeing } from './living-being.entity';
import { Brackets, Repository } from 'typeorm';
import { PaginateLivingBeingsInput } from './types/living-being.input';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

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
  async paginate(
    input: PaginateLivingBeingsInput,
  ): Promise<Pagination<LivingBeing>> {
    const name = input.keyword;
    const query = this.repository.createQueryBuilder('lb');
    if (input.areaId > 0)
      query.innerJoin('localizations', 'loc', 'loc."livingBeingsId" = lb.id');
    query.where(
      new Brackets((qb) => {
        qb.where(':name ILIKE ANY(lb."localNames")', { name }).orWhere(
          ':name ILIKE ANY(lb.names)',
          { name },
        );
      }),
    );
    if (input.areaId > 0)
      query.andWhere('loc."areaId" = :areaId', { areaId: input.areaId });
    return await paginate<LivingBeing>(query, {
      limit: input.limit,
      page: input.page,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} livingBeing`;
  }
}
