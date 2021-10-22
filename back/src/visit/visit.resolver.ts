import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VisitService } from './visit.service';
import { Visit } from './visit.entity';
import { CreateVisitInput } from './dto/create-visit.input';
import { UpdateVisitInput } from './dto/update-visit.input';

@Resolver(() => Visit)
export class VisitResolver {
  constructor(private readonly visitService: VisitService) {}

  @Mutation(() => Visit)
  createVisit(@Args('createVisitInput') createVisitInput: CreateVisitInput) {
    return this.visitService.create(createVisitInput);
  }

  @Query(() => [Visit], { name: 'visit' })
  findAll() {
    return this.visitService.findAll();
  }

  @Query(() => Visit, { name: 'visit' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.visitService.findOne(id);
  }

  @Mutation(() => Visit)
  updateVisit(@Args('updateVisitInput') updateVisitInput: UpdateVisitInput) {
    return this.visitService.update(updateVisitInput.id, updateVisitInput);
  }

  @Mutation(() => Visit)
  removeVisit(@Args('id', { type: () => Int }) id: number) {
    return this.visitService.remove(id);
  }
}
