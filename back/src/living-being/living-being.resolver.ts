import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { LivingBeingService } from './living-being.service';
import { LivingBeing } from './living-being.entity';
import { UserService } from '../user/user.service';

import {
  CreateLivingBeingInput,
  PaginateLivingBeingsInput,
} from './types/living-being.input';
import { CurrentUser } from '../auth/current-user-decorator';
import { StrategyType } from '../auth/types/strategy.type';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../shared/shared.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { Localization } from '../localization/localization.entity';
import { AreaService } from '../area/area.service';
import { uniqId, upload } from '../utils';
import { LivingBeingPagination } from './types/living-being.output';
import { LocalizationService } from '../localization/localization.service';

@Resolver(() => LivingBeing)
export class LivingBeingResolver {
  constructor(
    private livingBeingService: LivingBeingService,
    private userService: UserService,
    private areaService: AreaService,
    private localizationService: LocalizationService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LivingBeing)
  async createLivingBeing(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: [Upload],
    @Args('input') input: CreateLivingBeingInput,
  ): Promise<LivingBeing> {
    const { areaId, names, ...livingBeingInput } = input;
    const localization = new Localization();
    localization.area = await this.areaService.findOneById(areaId);
    const livingBeing = new LivingBeing();
    livingBeing.images = [];
    livingBeing.localizations = [];
    livingBeing.localNames = names.splice(0, 1);
    livingBeing.names = names;
    livingBeing.id = await uniqId('LivingBeing');
    for (const img of images) {
      const { filename } = await upload(img, 'livingBeings/', livingBeing.id);
      livingBeing.images.push(filename);
    }
    livingBeing.localizations.push(localization); /*set localization**/
    Object.assign(livingBeing, livingBeingInput);

    return this.livingBeingService.save(livingBeing);
  }

  @Query(() => LivingBeing, { nullable: true })
  async findLivingBeingByName(
    @Args('name') name: string,
  ): Promise<LivingBeing> {
    return this.livingBeingService.findByName(name);
  }
  @Query(() => LivingBeingPagination)
  async paginateLivingBeings(
    @Args('input') input: PaginateLivingBeingsInput,
  ): Promise<LivingBeingPagination> {
    return this.livingBeingService.paginateLb(input);
  }

  @Mutation(() => LivingBeing)
  async removeLivingBeing(@Args('id', { type: () => Int }) id: number) {
    return this.livingBeingService.remove(id);
  }

  @ResolveField(() => [Localization])
  async localizations(
    @Root() livingBeing: LivingBeing,
  ): Promise<Localization[]> {
    return this.localizationService.findByLivingBeing(livingBeing.id);
  }
}
