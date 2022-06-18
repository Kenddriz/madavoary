import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { AdventureService } from './adventure.service';
import { Adventure } from './adventure.entity';
import {
  AdventuresPagination,
  CountAdventuresOutput,
} from './types/adventure.output';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { GraphQLUpload } from 'graphql-upload';
import { StrategyType } from '../auth/types/strategy.type';
import { CurrentUser } from '../auth/current-user-decorator';
import { UserService } from '../user/user.service';
import { moveFile, removeFile, uploadV2 } from '../utils';
import { Upload } from '../shared/shared.input';
import {
  CountAdventureInput,
  CreateAdventureInput,
  PaginateAdventuresInput,
  UpdateAdventureImageInput,
  UpdateAdventureInput,
} from './types/adventure.input';
import { User } from '../user/user.entity';

@Resolver(() => Adventure)
export class AdventureResolver {
  constructor(
    private adventureService: AdventureService,
    private userService: UserService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Adventure)
  async createAdventure(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: [Upload],
    @Args('detail') input: CreateAdventureInput,
  ): Promise<Adventure> {
    const adventure = new Adventure();
    adventure.user = Object.assign(new User(), strategy);
    Object.assign(adventure, input);
    adventure.images = [];
    for (const img of images) {
      const { filename } = await img;
      adventure.images.push(
        adventure.user.id + images.indexOf(img) + filename.substr(-20),
      );
    }
    return new Promise<Adventure>((resolve) => {
      this.adventureService
        .save(adventure)
        .then(async (adventure) => {
          const folder = 'adventures/' + input.natureId;
          for (const img of images) {
            const { createReadStream } = await img;
            const index = images.indexOf(img);
            uploadV2(createReadStream, folder, adventure.images[index]);
          }
          resolve(adventure);
        })
        .catch(() => resolve(null));
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Adventure, { nullable: true })
  async updateAdventureImage(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args('input') input: UpdateAdventureImageInput,
  ): Promise<Adventure> {
    const { adventureId, imageIndex } = input;
    const adventure = await this.adventureService.findOneById(adventureId);
    const { createReadStream, filename } = await image;
    const oldImage = adventure.images[imageIndex];
    const newImage = strategy.id + imageIndex + filename.substr(-20);
    adventure.images[imageIndex] = newImage;
    return new Promise((resolve) => {
      this.adventureService
        .save(adventure)
        .then(async (adventure) => {
          const folder = 'adventures/' + adventure.natureId;
          /** upload new image when saved*/
          await uploadV2(createReadStream, folder, newImage);
          /** remove old image*/
          removeFile(folder + '/' + oldImage);
          resolve(adventure);
        })
        .catch(() => resolve(null));
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Adventure, { nullable: true })
  async adventureAddImage(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args({ name: 'adventureId', type: () => Int }) adventureId: number,
  ): Promise<Adventure> {
    const adventure = await this.adventureService.findOneById(adventureId);
    const { createReadStream, filename } = await image;
    const imageIndex = adventure.images.length - 1;
    const newImage = strategy.id + imageIndex + filename.substr(-20);
    adventure.images.push(newImage);
    return new Promise((resolve) => {
      this.adventureService
        .save(adventure)
        .then(async (adventure) => {
          await uploadV2(
            createReadStream,
            'adventures/' + adventure.natureId,
            newImage,
          );
          resolve(adventure);
        })
        .catch(() => resolve(null));
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Adventure, { nullable: true })
  async adventureRemoveImage(
    @Args('input') input: UpdateAdventureImageInput,
  ): Promise<Adventure> {
    const { adventureId, imageIndex } = input;
    const adventure = await this.adventureService.findOneById(adventureId);
    const image = adventure.images[imageIndex];
    const folder = 'adventures/' + adventure.natureId + '/';
    adventure.images.splice(imageIndex, 1);
    return new Promise((resolve) => {
      this.adventureService
        .save(adventure)
        .then((adventure) => {
          removeFile(folder + image);
          resolve(adventure);
        })
        .catch(() => resolve(null));
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Adventure)
  async updateAdventure(
    @Args('input') input: UpdateAdventureInput,
  ): Promise<Adventure> {
    const adventure = await this.adventureService.findOneById(input.id);
    if (input.natureId !== adventure.natureId) {
      adventure.images.forEach((image) => {
        const source = 'adventures/' + adventure.natureId + '/' + image;
        const destination = 'adventures/' + input.natureId + '/';
        moveFile(source, destination, image);
      });
    }
    Object.assign(adventure, input);
    return this.adventureService.save(adventure);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [CountAdventuresOutput])
  async countAdventures(
    @Args('input') input: CountAdventureInput,
  ): Promise<CountAdventuresOutput[]> {
    return this.adventureService.countAdventures(input.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Adventure, { nullable: true })
  async findAdventure(
    @Args({ name: 'id', type: () => Int }) id: number,
    @CurrentUser() strategy: StrategyType,
  ): Promise<Adventure> {
    const adventure = await this.adventureService.findOneById(id);
    if (adventure && adventure.userId !== strategy.id) return null;
    return adventure;
  }

  @Query(() => AdventuresPagination)
  async paginateAdventures(
    @Args('input') input: PaginateAdventuresInput,
    @CurrentUser() strategy: StrategyType,
  ): Promise<AdventuresPagination> {
    return this.adventureService.paginate(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Adventure)
  async removeAdventure(@Args('id', { type: () => Int }) id: number) {
    const { natureId, images } = await this.adventureService.findOneById(id);
    images.forEach((image) => {
      removeFile('adventures/' + natureId + '/' + image);
    });
    return this.adventureService.remove(id);
  }

  @ResolveField(() => User)
  async user(@Root() adventure: Adventure): Promise<User> {
    return this.userService.findOneById(adventure.userId);
  }
}
