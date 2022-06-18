import { Query, Resolver } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

@Resolver()
export class AppResolver {
  @Query(() => [Number])
  async dashboardCounter(): Promise<number[]> {
    return Promise.all(
      [
        'users',
        'areas',
        'visits',
        'livingBeings',
        'transactions',
        'adventures',
      ].map(async (repo) => await getRepository(repo).count()),
    );
  }
}
