import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { Repository } from 'typeorm';
import { PaginateLivingBeingsInput } from '../living-being/types/living-being.input';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private repository: Repository<Visit>,
  ) {}
  async save(visit: Visit): Promise<Visit> {
    return this.repository.save(visit);
  }

  async findOne(id: number): Promise<Visit> {
    return this.repository.findOne(id);
  }

  async paginate(input: PaginateLivingBeingsInput): Promise<Pagination<Visit>> {
    const keyword = `%${input.keyword}%`;
    const query = this.repository
      .createQueryBuilder()
      .where('country ILIKE :keyword', { keyword })
      .orWhere('"countryCode" ILIKE :keyword', { keyword })
      .orWhere('city ILIKE :keyword', { keyword })
      .orWhere('region ILIKE :keyword', { keyword })
      .orderBy(`"${input.sortBy}"`, input.order);
    const options: IPaginationOptions = {
      page: input.page,
      limit: input.limit,
    };
    return paginate<Visit>(query, options);
  }
  /**Monthly visits diagram data*/
  async monthly() {
    const year = new Date().getFullYear();
    return this.repository
      .createQueryBuilder('visit')
      .select('COUNT(visit.id)', 'value')
      .addSelect('EXTRACT("MONTH" FROM visit.entered_at)', 'label')
      .where('EXTRACT("YEAR" FROM visit.entered_at)= :year', { year })
      .groupBy('label')
      .getRawMany();
  }
}
