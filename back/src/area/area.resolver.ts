import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AreaService } from './area.service';
import { Area } from './area.entity';
import { CreateAreaInput } from './types/area.input';

@Resolver(() => Area)
export class AreaResolver {
  constructor(private areaService: AreaService) {}

  @Mutation(() => Area)
  async createArea(@Args('input') input: CreateAreaInput): Promise<Area> {
    const area: Area = new Area();
    Object.assign(area, input);
    return this.areaService.save(area);
  }

  @Query(() => [Area], { name: 'area' })
  findAll() {
    return this.areaService.findAll();
  }

  @Query(() => Area, { name: 'area' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.areaService.findOne(id);
  }


  @Mutation(() => Area)
  removeArea(@Args('id', { type: () => Int }) id: number) {
    return this.areaService.remove(id);
  }
}
