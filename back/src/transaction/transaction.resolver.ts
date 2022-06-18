import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { TransactionInput } from './types/transaction.input';
import { Revenue5LastYears } from './types/transaction.output';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('input') input: TransactionInput,
  ): Promise<Transaction> {
    const transaction = new Transaction();
    Object.assign(transaction, input);
    return this.transactionService.save(transaction);
  }
  @Query(() => [Revenue5LastYears])
  async revenue5LastYears() {
    return this.transactionService.revenue5LastYears();
  }
}
