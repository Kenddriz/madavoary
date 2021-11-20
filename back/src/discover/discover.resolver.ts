import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { DiscoverService } from './discover.service';
import { Discover } from './discover.entity';
import { CreateDiscoverInput } from './types/create-discover.input';
import { UpdateDiscoverInput } from './types/update-discover.input';
import { LivingBeingService } from '../living-being/living-being.service';
import { LivingBeing } from '../living-being/living-being.entity';
import { PersonService } from '../person/person.service';
import { Person } from '../person/person.entity';

@Resolver(() => Discover)
export class DiscoverResolver {
  constructor(
    private discoverService: DiscoverService,
    private livingBeingService: LivingBeingService,
    private personService: PersonService,
  ) {}

  @Mutation(() => Discover)
  createDiscover(
    @Args('createDiscoverInput') createDiscoverInput: CreateDiscoverInput,
  ) {
    return this.discoverService.create(createDiscoverInput);
  }

  @Query(() => [Discover], { name: 'discover' })
  findAll() {
    return this.discoverService.findAll();
  }

  @Query(() => Discover, { name: 'discover' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.discoverService.findOne(id);
  }

  @Mutation(() => Discover)
  updateDiscover(@Args('input') input: UpdateDiscoverInput) {
    return this.discoverService.update(input.id, input);
  }

  @Mutation(() => Discover)
  removeDiscover(@Args('id', { type: () => Int }) id: number) {
    return this.discoverService.remove(id);
  }
  @ResolveField(() => LivingBeing)
  async livingBeing(@Root() discover: Discover): Promise<LivingBeing> {
    return this.livingBeingService.findOneById(discover.livingBeingId);
  }
  @ResolveField(() => Person)
  async person(@Root() discover: Discover): Promise<Person> {
    return this.personService.findOneById(discover.personId);
  }
}
