import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { SpeciesService } from './species.service';
import { Species } from './species.entity';
import { CreateSpeciesInput } from './dto/create-species.input';
import { DiscoverService } from '../discover/discover.service';
import { Discover } from '../discover/discover.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(
    private speciesService: SpeciesService,
    private discoverService: DiscoverService,
    private userService: UserService,
  ) {}

  @Mutation(() => Species)
  createSpecies(
    @Args('createSpeciesInput') createSpeciesInput: CreateSpeciesInput,
  ) {
    return this.speciesService.create(createSpeciesInput);
  }

  @Query(() => [Species], { name: 'species' })
  findAll() {
    return this.speciesService.findAll();
  }

  @Query(() => Species, { name: 'species' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.speciesService.findOne(id);
  }

  @Mutation(() => Species)
  removeSpecies(@Args('id', { type: () => Int }) id: number) {
    return this.speciesService.remove(id);
  }
  @ResolveField(() => Discover, { nullable: true })
  async discover(@Root() species: Species): Promise<Discover> {
    return this.discoverService.findBySpecies(species.id);
  }
  @ResolveField(() => User)
  async user(@Root() species: Species): Promise<User> {
    return this.userService.findOneById(species.userId);
  }
}
