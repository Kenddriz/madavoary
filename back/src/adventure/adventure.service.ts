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
  async paginateAdventures(
    input: PaginateAdventureInput,
  ): Promise<Pagination<Adventure>> {
    const keyword = `%${input.keyword}%`;

    const queryBuilder = this.repository.createQueryBuilder('col').where(
      new Brackets((qb) => {
        qb.where('col.naming ILike :keyword', { keyword })
          .orWhere('col.place ILike :keyword', { keyword })
          .orWhere('col.description ILike :keyword', { keyword });
      }),
    );
    if (input.natureId >= 0) {
      queryBuilder.andWhere(`col."natureId" = :natureId`, {
        natureId: input.natureId,
      });
    }
    if (input.userId > 0) {
      queryBuilder.andWhere(`col."userId" = :userId`, { userId: input.userId });
    }
    queryBuilder.orderBy('col.createdAt', 'DESC');

    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    return paginate<Adventure>(queryBuilder, options);
  }
  async paginate(
    input: PaginateAdventuresInput,
  ): Promise<Pagination<Adventure>> {
    const keyword = `%${input.keyword}%`;

    const queryBuilder = this.repository
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
      })
      .orderBy(`col.${input.sortBy}`, input.order);

    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    return paginate<Adventure>(queryBuilder, options);
  }

  async userBook(userId: number, year: number): Promise<Adventure[]> {
    return this.repository
      .createQueryBuilder()
      .where('userId = :userId', { userId })
      .andWhere('EXTRACT(YEAR FROM createdAt) = :year', { year })
      .getMany();
  }
}
