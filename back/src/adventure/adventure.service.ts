import { Injectable } from '@nestjs/common';
import { Adventure } from './adventure.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  PaginateAdventuresInput,
  PaginateAdventureInput,
} from './types/adventure.input';

@Injectable()
export class AdventureService {
  constructor(
    @InjectRepository(Adventure)
    private repository: Repository<Adventure>,
  ) {}
  async save(collection: Adventure): Promise<Adventure> {
    return this.repository.save(collection);
  }

  async findOneById(id: number): Promise<Adventure> {
    return this.repository.findOne(id);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async remove(id: number): Promise<boolean> {
    const query = await this.repository.delete(id);
    return query.affected > 0;
  }
  async countAdventures(userId: number) {
    const query = this.repository
      .createQueryBuilder()
      .select(['COUNT(id) AS count', '"natureId"']);
    if (userId > 0) query.where('"userId" = :userId', { userId });
    return query.groupBy('"natureId"').getRawMany();
  }

  async paginate(
    input: PaginateAdventuresInput,
  ): Promise<Pagination<Adventure>> {
    const keyword = `%${input.keyword}%`;

    const query = this.repository
      .createQueryBuilder('col')
      .where(
        new Brackets((qb) => {
          qb.where('col.naming ILike :keyword', { keyword })
            .orWhere('col.place ILike :keyword', { keyword })
            .orWhere('col.description ILike :keyword', { keyword });
        }),
      )
      .andWhere(`col."natureId" IN (:...natureIds)`, {
        natureIds: input.natureIds,
      });
    if (input.userId)
      query.andWhere(`col."userId" = :userId`, { userId: input.userId });
    query.orderBy(`col.${input.sortBy}`, input.order);

    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    return paginate<Adventure>(query, options);
  }

  async userBook(userId: number, year: number): Promise<Adventure[]> {
    return this.repository
      .createQueryBuilder()
      .where('userId = :userId', { userId })
      .andWhere('EXTRACT(YEAR FROM createdAt) = :year', { year })
      .getMany();
  }
}
