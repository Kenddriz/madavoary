import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocalizationService } from './localization.service';
import { Localization } from './localization.entity';
import { CreateLocalizationInput } from './dto/create-localization.input';
import { UpdateLocalizationInput } from './dto/update-localization.input';

@Resolver(() => Localization)
export class LocalizationResolver {
  constructor(private readonly localizationService: LocalizationService) {}

  @Mutation(() => Localization)
  createLocalization(@Args('createLocalizationInput') createLocalizationInput: CreateLocalizationInput) {
    return this.localizationService.create(createLocalizationInput);
  }

  @Query(() => [Localization], { name: 'localization' })
  findAll() {
    return this.localizationService.findAll();
  }

  @Query(() => Localization, { name: 'localization' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.localizationService.findOne(id);
  }

  @Mutation(() => Localization)
  updateLocalization(@Args('updateLocalizationInput') updateLocalizationInput: UpdateLocalizationInput) {
    return this.localizationService.update(updateLocalizationInput.id, updateLocalizationInput);
  }

  @Mutation(() => Localization)
  removeLocalization(@Args('id', { type: () => Int }) id: number) {
    return this.localizationService.remove(id);
  }
}
