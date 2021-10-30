import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { Collection } from './collection.entity';
import {
  CollectionPagination,
  CountCollectionsOutput,
} from './types/collection.output';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { GraphQLUpload } from 'graphql-upload';
import { StrategyType } from '../auth/types/strategy.type';
import { CurrentUser } from '../auth/current-user-decorator';
import { UserService } from '../user/user.service';
import { moveFile, removeFile, upload } from '../utils';
import { Upload } from '../shared/shared.input';
import {
  CountCollectionInput,
  CreateCollectionInput,
  PaginateCollectionInput,
  UpdateCollectionImageInput,
  UpdateCollectionInput,
} from './types/collection.input';
import { User } from '../user/user.entity';
import { Species } from '../species/species.entity';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(
    private collectionService: CollectionService,
    private userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Collection)
  async createCollection(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: [Upload],
    @Args('detail') input: CreateCollectionInput,
  ): Promise<Collection> {
    const collection = new Collection();
    collection.user = await this.userService.findOneById(strategy.payload);
    Object.assign(collection, input);
    collection.images = [];

    for (const img of images) {
      const { filename } = await upload(
        img,
        'collections/' + input.natureId,
        collection.user.id + images.indexOf(img),
      );
      collection.images.push(filename);
    }
    return this.collectionService.save(collection);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Collection)
  async updateCollectionImage(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args('input') input: UpdateCollectionImageInput,
  ): Promise<Collection> {
    const { collectionId, imageIndex } = input;
    const collection = await this.collectionService.findOneById(collectionId);
    const { filename } = await upload(
      image,
      'collections/' + collection.natureId,
      strategy.payload + imageIndex,
    );
    collection.images[imageIndex] = filename;
    return this.collectionService.save(collection);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Collection)
  async addCollectionImage(
    @CurrentUser() strategy: StrategyType,
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args({ name: 'collectionId', type: () => Int }) collectionId: number,
  ): Promise<Collection> {
    const collection = await this.collectionService.findOneById(collectionId);
    const { filename } = await upload(
      image,
      'collections/' + collection.natureId,
      strategy.payload + collection.images.length,
    );
    collection.images.push(filename);
    return this.collectionService.save(collection);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Collection)
  async updateCollection(
    @Args('input') input: UpdateCollectionInput,
  ): Promise<Collection> {
    const collection = await this.collectionService.findOneById(input.id);
    if (input.natureId !== collection.natureId) {
      collection.images.forEach((image) => {
        const source = 'collections/' + collection.natureId + '/' + image;
        const destination = 'collections/' + input.natureId + '/';
        moveFile(source, destination, image);
      });
    }
    Object.assign(collection, input);
    return this.collectionService.save(collection);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [CountCollectionsOutput])
  async countCollections(
    @Args('input') input: CountCollectionInput,
  ): Promise<CountCollectionsOutput[]> {
    return this.collectionService.countCollections(input.id);
  }

  @Query(() => CollectionPagination)
  async paginateCollections(
    @Args('input') input: PaginateCollectionInput,
  ): Promise<CollectionPagination> {
    return this.collectionService.paginateCollections(input);
  }

  @Mutation(() => Collection)
  async removeCollection(@Args('id', { type: () => Int }) id: number) {
    const { natureId, images } = await this.collectionService.findOneById(id);
    images.forEach((image) => {
      removeFile('collections/' + natureId + '/' + image);
    });
    return this.collectionService.remove(id);
  }

  @ResolveField(() => User)
  async user(@Root() species: Species): Promise<User> {
    return this.userService.findOneById(species.userId);
  }
}
