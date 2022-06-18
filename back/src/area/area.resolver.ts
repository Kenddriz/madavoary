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
import { removeFile, uniqId, upload, uploadV2 } from '../utils';

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
    const { filename, createReadStream } = await banner;
    Object.assign(area, {
      ...input,
      geo: `(${input.geo.x}, ${input.geo.y})`,
    });
    area.banner = area.id + '-' + filename.substr(-5);
    return new Promise((resolve) => {
      this.areaService
        .save(area)
        .then((adventure) => {
          uploadV2(createReadStream, 'areas/', area.banner);
          adventure.geo = input.geo;
          resolve(adventure);
        })
        .catch(() => resolve(null));
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Area)
  async updateArea(
    @Args('input') input: UpdateAreaInput,
    @Args({ name: 'banner', type: () => GraphQLUpload, nullable: true })
    banner: Upload,
  ): Promise<Area> {
    let area = await this.areaService.findOneById(input.id);
    Object.assign(area, {
      ...input,
      geo: `(${input.geo.x}, ${input.geo.y})`,
    });
    if (banner) {
      const { filename, createReadStream } = await banner;
      removeFile('areas/' + area.banner);
      area.banner = area.id + '-' + filename.substr(-5);
      await uploadV2(createReadStream, 'areas/', area.banner);
    }
    area = await this.areaService.save(area);
    area.geo = input.geo;
    return area;
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Area)
  async updateAreaBanner(
    @Args({ name: 'banner', type: () => GraphQLUpload }) banner: Upload,
    @Args({ name: 'areaId', type: () => Int }) id: number,
  ): Promise<Area> {
    let area = await this.areaService.findOneById(id);
    const geo = area.geo;
    Object.assign(area, { geo: `(${geo.x}, ${geo.y})` });
    const { filename } = await upload(banner, 'areas/', id);
    removeFile('areas/' + area.banner);
    area.banner = filename;
    area = await this.areaService.save(area);
    area.geo = geo;
    return area;
  }
  @Query(() => [Area])
  async areas() {
    return this.areaService.findAll();
  }

  @Query(() => Area, { nullable: true })
  async findArea(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.areaService.findOneById(id);
  }

  @Mutation(() => Area)
  async removeArea(@Args('id', { type: () => Int }) id: number) {
    return this.areaService.remove(id);
  }
}
