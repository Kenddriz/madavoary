import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { VisitService } from './visit.service';
import { Visit } from './visit.entity';
import { CreateVisitInput } from './types/visit.input';
import { PaginateLivingBeingsInput } from '../living-being/types/living-being.input';
import { VisitPagination } from './types/visit-output';
import { NumeralOption } from '../shared/shared.dto';

@Resolver(() => Visit)
export class VisitResolver {
  constructor(private readonly visitService: VisitService) {}

  @Mutation(() => Visit)
  async createVisit(@Args('input') input: CreateVisitInput) {
    let visit = new Visit();
    Object.assign(visit, {
      ...input,
      geo: `(${input.geo.x}, ${input.geo.y})`,
    });
    visit = await this.visitService.save(visit);
    visit.geo = input.geo;
    return visit;
  }

  @Query(() => VisitPagination)
  async paginateVisits(
    @Args('input') input: PaginateLivingBeingsInput,
  ): Promise<VisitPagination> {
    return this.visitService.paginate(input);
  }
  @Query(() => [NumeralOption])
  async visitsMonthly(): Promise<NumeralOption[]> {
    return this.visitService.monthly();
  }
}
