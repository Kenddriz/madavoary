import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpeciesService } from './species.service';
import { Species } from './species.entity';
import { CreateSpeciesInput } from './dto/create-species.input';
import { UpdateSpeciesInput } from './dto/update-species.input';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private readonly speciesService: SpeciesService) {}

  @Mutation(() => Species)
  createSpecies(@Args('createSpeciesInput') createSpeciesInput: CreateSpeciesInput) {
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
  updateSpecies(@Args('updateSpeciesInput') updateSpeciesInput: UpdateSpeciesInput) {
    return this.speciesService.update(updateSpeciesInput.id, updateSpeciesInput);
  }

  @Mutation(() => Species)
  removeSpecies(@Args('id', { type: () => Int }) id: number) {
    return this.speciesService.remove(id);
  }
}
