import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AreaService } from './area.service';
import { Area } from './area.entity';
import { CreateAreaInput, UpdateAreaInput } from './types/area.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user-decorator';
import { StrategyType } from '../auth/types/strategy.type';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../shared/shared.input';
import { removeFile, uniqId, upload } from '../utils';

@Resolver(() => Area)
export class AreaResolver {
  constructor(private areaService: AreaService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Area)
  async createArea(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'banner', type: () => GraphQLUpload }) banner: Upload,
    @Args('input') input: CreateAreaInput,
  ): Promise<Area> {
    const area = new Area();
    area.id = await uniqId('Area');
    const { filename } = await upload(banner, 'areas/', area.id);
    area.banner = filename;
    Object.assign(area, input);
    return this.areaService.save(area);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Area)
  async updateArea(@Args('input') input: UpdateAreaInput): Promise<Area> {
    const area = await this.areaService.findOneById(input.id);
    Object.assign(area, input);
    return this.areaService.save(area);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Area)
  async updateAreaBanner(
    @Args({ name: 'banner', type: () => GraphQLUpload }) banner: Upload,
    @Args({ name: 'areaId', type: () => Int }) id: number,
  ): Promise<Area> {
    const area = await this.areaService.findOneById(id);
    const { filename } = await upload(banner, 'areas/', id);
    removeFile('areas/' + area.banner);
    area.banner = filename;
    return this.areaService.save(area);
  }
  @Query(() => [Area])
  async areas() {
    return this.areaService.findAll();
  }

  @Mutation(() => Area)
  async removeArea(@Args('id', { type: () => Int }) id: number) {
    return this.areaService.remove(id);
  }
}
