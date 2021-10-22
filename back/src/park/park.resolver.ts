import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParkService } from './park.service';
import { Park } from './park.entity';
import { CreateParkInput } from './dto/create-park.input';
import { UpdateParkInput } from './dto/update-park.input';

@Resolver(() => Park)
export class ParkResolver {
  constructor(private readonly parkService: ParkService) {}

  @Mutation(() => Park)
  createPark(@Args('createParkInput') createParkInput: CreateParkInput) {
    return this.parkService.create(createParkInput);
  }

  @Query(() => [Park], { name: 'park' })
  findAll() {
    return this.parkService.findAll();
  }

  @Query(() => Park, { name: 'park' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parkService.findOne(id);
  }

  @Mutation(() => Park)
  updatePark(@Args('updateParkInput') updateParkInput: UpdateParkInput) {
    return this.parkService.update(updateParkInput.id, updateParkInput);
  }

  @Mutation(() => Park)
  removePark(@Args('id', { type: () => Int }) id: number) {
    return this.parkService.remove(id);
  }
}
