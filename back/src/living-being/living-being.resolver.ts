import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { LivingBeingService } from './living-being.service';
import { LivingBeing } from './living-being.entity';
import { UserService } from '../user/user.service';

import {
  CreateLivingBeingInput,
  PaginateLivingBeingsInput,
  UpdateLivingBeingInput,
} from './types/living-being.input';
import { GraphQLUpload } from 'graphql-upload';
import { UpdateImageInput, Upload } from '../shared/shared.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { AreaService } from '../area/area.service';
import { removeFile, uploadV2 } from '../utils';
import { LivingBeingPagination } from './types/living-being.output';
import { Area } from '../area/area.entity';
import { ClassifierService } from '../classifier/classifier.service';
import { Classifier } from '../classifier/classifier.entity';
import { CurrentUser } from '../auth/current-user-decorator';
import { StrategyType } from '../auth/types/strategy.type';

@Resolver(() => LivingBeing)
export class LivingBeingResolver {
  constructor(
    private livingBeingService: LivingBeingService,
    private userService: UserService,
    private areaService: AreaService,
    private classifierService: ClassifierService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LivingBeing)
  async createLivingBeing(
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: [Upload],
    @Args('input') input: CreateLivingBeingInput,
  ): Promise<LivingBeing> {
    const { classifierIds, areaIds, ...livingBeingInput } = input;
    let livingBeing = new LivingBeing();
    Object.assign(livingBeing, livingBeingInput);
    livingBeing.images = [];
    livingBeing.areas = await this.areaService.findOneByIds(areaIds);
    livingBeing.classifiers = await this.classifierService.findByIds(
      classifierIds,
    );
    for (const img of images) {
      const { filename } = await img;
      livingBeing.images.push(filename);
    }
    livingBeing = await this.livingBeingService.save(livingBeing);
    for (const img of images) {
      const { createReadStream } = await img;
      const index = images.indexOf(img);
      uploadV2(createReadStream, 'livingBeings/', livingBeing.images[index]);
    }
    return livingBeing;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LivingBeing)
  async updateLivingBeing(
    @Args('input') input: UpdateLivingBeingInput,
  ): Promise<LivingBeing> {
    const { id, classifierIds, areaIds, ...livingBeingInput } = input;
    const livingBeing = await this.livingBeingService.findOneById(id);
    Object.assign(livingBeing, livingBeingInput);
    livingBeing.images = [];
    livingBeing.areas = await this.areaService.findOneByIds(areaIds);
    livingBeing.classifiers = await this.classifierService.findByIds(
      classifierIds,
    );
    return this.livingBeingService.save(livingBeing);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LivingBeing, { nullable: true })
  async updateLivingBeingImage(
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args('input') input: UpdateImageInput,
  ): Promise<LivingBeing> {
    const { id, index } = input;
    const livingBeing = await this.livingBeingService.findOneById(id);
    const { createReadStream, filename } = await image;
    const oldImage = livingBeing.images[index];
    livingBeing.images[index] = filename;
    return new Promise((resolve) => {
      this.livingBeingService
        .save(livingBeing)
        .then(async (livingBeing) => {
          const folder = 'livingBeings/';
          /** upload new image when saved*/
          await uploadV2(createReadStream, folder, filename);
          /** remove old image*/
          removeFile(folder + '/' + oldImage);
          resolve(livingBeing);
        })
        .catch(() => resolve(null));
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LivingBeing, { nullable: true })
  async livingBeingAddImage(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<LivingBeing> {
    const livingBeing = await this.livingBeingService.findOneById(id);
    const { createReadStream, filename } = await image;
    livingBeing.images.push(filename);
    return new Promise((resolve) => {
      this.livingBeingService
        .save(livingBeing)
        .then(async (livingBeing) => {
          await uploadV2(createReadStream, 'livingBeings/', filename);
          resolve(livingBeing);
        })
        .catch(() => resolve(null));
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LivingBeing, { nullable: true })
  async livingBeingRemoveImage(
    @Args('input') input: UpdateImageInput,
  ): Promise<LivingBeing> {
    const { id, index } = input;
    const livingBeing = await this.livingBeingService.findOneById(id);
    const image = livingBeing.images[index];
    const folder = 'livingBeings/';
    livingBeing.images.splice(index, 1);
    return new Promise((resolve) => {
      this.livingBeingService
        .save(livingBeing)
        .then((livingBeing) => {
          removeFile(folder + image);
          resolve(livingBeing);
        })
        .catch(() => resolve(null));
    });
  }

  @Query(() => LivingBeing, { nullable: true })
  async findLivingBeingByName(
    @Args('name') name: string,
  ): Promise<LivingBeing> {
    return this.livingBeingService.findByName(name);
  }

  @Query(() => LivingBeing, { nullable: true })
  async findLivingBeing(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<LivingBeing> {
    return this.livingBeingService.findOneById(id);
  }

  @Query(() => LivingBeingPagination)
  async paginateLivingBeings(
    @Args('input') input: PaginateLivingBeingsInput,
  ): Promise<LivingBeingPagination> {
    return this.livingBeingService.paginate(input);
  }

  @Query(() => [LivingBeing])
  async findLivingBeingByArea(
    @Args({ name: 'areaId', type: () => Int }) areaId: number,
  ): Promise<LivingBeing[]> {
    return this.livingBeingService.findByArea(areaId);
  }

  @Mutation(() => LivingBeing)
  async removeLivingBeing(@Args('id', { type: () => Int }) id: number) {
    return this.livingBeingService.remove(id);
  }

  @ResolveField(() => [Area])
  async areas(@Root() livingBeing: LivingBeing): Promise<Area[]> {
    return this.areaService.findByLivingBeing(livingBeing.id);
  }

  @ResolveField(() => [Classifier])
  async classifiers(@Root() livingBeing: LivingBeing): Promise<Classifier[]> {
    return this.classifierService.findByLivingBeing(livingBeing.id);
  }
}
