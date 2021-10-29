import { Injectable } from '@nestjs/common';
import { Collection } from './collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { PaginateCollectionInput } from './types/collection.input';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private repository: Repository<Collection>,
  ) {}
  async save(collection: Collection): Promise<Collection> {
    return this.repository.save(collection);
  }

  async findOne(id: number): Promise<Collection> {
    return this.repository.findOne(id);
  }

  async remove(id: number) {
    return `This action removes a #${id} collection`;
  }
  async countCollections(userId: number) {
    const query = this.repository
      .createQueryBuilder()
      .select(['COUNT(id) AS count', '"natureId"']);
    if (userId > 0) query.where('"userId" = :userId', { userId });
    return query.groupBy('"natureId"').getRawMany();
  }
  async paginateCollections(
    input: PaginateCollectionInput,
  ): Promise<Pagination<Collection>> {
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
    return await paginate<Collection>(queryBuilder, options);
  }
  async userBook(userId: number, year: number): Promise<Collection[]> {
    return this.repository
      .createQueryBuilder()
      .where('userId = :userId', { userId })
      .andWhere('EXTRACT(YEAR FROM createdAt) = :year', { year })
      .getMany();
  }
}
