import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
  ) {}
  async save(transaction: Transaction): Promise<Transaction> {
    return this.repository.save(transaction);
  }
  async findOne(id: number): Promise<Transaction> {
    return this.repository.findOne(id);
  }
  async revenue5LastYears() {
    const year = new Date().getFullYear();
    return this.repository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'amount')
      .addSelect('EXTRACT("YEAR" FROM transaction.created_at)', 'year')
      .addSelect('SUM(transaction.type)', 'type')
      .where('EXTRACT("YEAR" FROM transaction.created_at) <= :year', { year })
      .groupBy('year')
      .addGroupBy('type')
      .orderBy('year', 'DESC')
      .limit(5)
      .getRawMany();
  }
}
