import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { ClassifierService } from './classifier.service';
import { Classifier } from './classifier.entity';
import {
  CreateClassifierInput,
  MoveClassifierInput,
  UpdateClassifierInput,
} from './types/classifier.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user-decorator';
import { StrategyType } from '../auth/types/strategy.type';
import { uniqId } from '../utils';

@Resolver(() => Classifier)
export class ClassifierResolver {
  constructor(private readonly classifierService: ClassifierService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Classifier)
  async createClassifier(
    @CurrentUser() strategy: StrategyType,
    @Args('input') input: CreateClassifierInput,
  ) {
    const classifier = new Classifier();
    classifier.id = await uniqId('Classifier');
    Object.assign(classifier, input);
    if (input.parentId) {
      classifier.parent = await this.classifierService.findOneById(
        input.parentId,
      );
    }
    return this.classifierService.save(classifier);
  }

  @Query(() => [Classifier])
  async classifiers(): Promise<Classifier[]> {
    return this.classifierService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Classifier)
  async updateClassifier(@Args('input') input: UpdateClassifierInput) {
    const classifier = await this.classifierService.findOneById(input.id);
    Object.assign(classifier, input);
    return this.classifierService.save(classifier);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Classifier)
  async moveClassifier(@Args('input') input: MoveClassifierInput) {
    const classifier = await this.classifierService.findOneById(input.id);
    classifier.parent = await this.classifierService.findOneById(
      input.parentId,
    );
    classifier.level = classifier.parent.level + 1;
    return this.classifierService.save(classifier);
  }

  @Mutation(() => Classifier)
  async removeClassifier(@Args('id', { type: () => Int }) id: number) {
    return this.classifierService.remove(id);
  }
}
