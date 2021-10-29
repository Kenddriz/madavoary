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
import { CreateDiscoverInput } from './dto/create-discover.input';
import { UpdateDiscoverInput } from './dto/update-discover.input';
import { SpeciesService } from '../species/species.service';
import { Species } from '../species/species.entity';

@Resolver(() => Discover)
export class DiscoverResolver {
  constructor(
    private discoverService: DiscoverService,
    private speciesService: SpeciesService,
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
  updateDiscover(
    @Args('updateDiscoverInput') updateDiscoverInput: UpdateDiscoverInput,
  ) {
    return this.discoverService.update(
      updateDiscoverInput.id,
      updateDiscoverInput,
    );
  }

  @Mutation(() => Discover)
  removeDiscover(@Args('id', { type: () => Int }) id: number) {
    return this.discoverService.remove(id);
  }
  @ResolveField(() => Species)
  async species(@Root() discover: Discover): Promise<Species> {
    return this.speciesService.findOneById(discover.speciesId);
  }
}
