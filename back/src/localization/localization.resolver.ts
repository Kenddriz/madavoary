import {
  Resolver,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { LocalizationService } from './localization.service';
import { Localization } from './localization.entity';
import { AreaService } from '../area/area.service';
import { Area } from '../area/area.entity';

@Resolver(() => Localization)
export class LocalizationResolver {
  constructor(
    private localizationService: LocalizationService,
    private areaService: AreaService,
  ) {}

  @Mutation(() => Localization)
  removeLocalization(@Args('id', { type: () => Int }) id: number) {
    return this.localizationService.remove(id);
  }
  @ResolveField(() => Area, { nullable: true })
  async area(@Root() localization: Localization): Promise<Area> {
    return this.areaService.findOneById(localization.areaId);
  }
}
