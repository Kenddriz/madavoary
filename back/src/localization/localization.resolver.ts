import {
  Resolver,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { LocalizationService } from './localization.service';
import { Localization } from './localization.entity';
import { AreaService } from '../area/area.service';

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
}
