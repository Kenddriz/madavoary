import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParkService } from './park.service';
import { Park } from './park.entity';
import { CreateParkInput } from './types/park.input';

@Resolver(() => Park)
export class ParkResolver {
  constructor(private parkService: ParkService) {}

  @Mutation(() => Park)
  async createPark(@Args('input') input: CreateParkInput): Promise<Park> {
    const park: Park = new Park();
    Object.assign(park, input);
    return this.parkService.save(park);
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
  removePark(@Args('id', { type: () => Int }) id: number) {
    return this.parkService.remove(id);
  }
}
