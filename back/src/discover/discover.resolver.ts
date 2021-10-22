import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DiscoverService } from './discover.service';
import { Discover } from './discover.entity';
import { CreateDiscoverInput } from './dto/create-discover.input';
import { UpdateDiscoverInput } from './dto/update-discover.input';

@Resolver(() => Discover)
export class DiscoverResolver {
  constructor(private readonly discoverService: DiscoverService) {}

  @Mutation(() => Discover)
  createDiscover(@Args('createDiscoverInput') createDiscoverInput: CreateDiscoverInput) {
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
  updateDiscover(@Args('updateDiscoverInput') updateDiscoverInput: UpdateDiscoverInput) {
    return this.discoverService.update(updateDiscoverInput.id, updateDiscoverInput);
  }

  @Mutation(() => Discover)
  removeDiscover(@Args('id', { type: () => Int }) id: number) {
    return this.discoverService.remove(id);
  }
}
