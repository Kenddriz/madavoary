import { InputType, Field, Int } from '@nestjs/graphql';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class CreateLivingBeingInput {
  @Field(() => [String])
  descriptions: string[];
  @Field(() => [String])
  names: string[];
  @Field()
  endemic: boolean;
  @Field(() => [Int])
  classifierIds: number[];
  @Field(() => [Int])
  areaIds: number[];
}

@InputType()
export class UpdateLivingBeingInput extends CreateLivingBeingInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class PaginateLivingBeingsInput extends PaginationInput {
  @Field()
  sortBy: string;
  @Field()
  order: 'ASC' | 'DESC';
}

@InputType()
export class FindLivingBeingsByAreaInput {
  @Field(() => Int)
  id: number;
}
