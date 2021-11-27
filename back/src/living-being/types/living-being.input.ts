import { InputType, Field, Int } from '@nestjs/graphql';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class CreateLivingBeingInput {
  @Field(() => [String])
  specificities: string[];
  @Field(() => [String])
  names: string[];
  @Field()
  endemic: boolean;
  @Field()
  endangered: boolean;
  @Field(() => Int)
  areaId: number;
}

@InputType()
export class UpdateLivingBeingInput extends CreateLivingBeingInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class PaginateLivingBeingsInput extends PaginationInput {
  @Field(() => Int)
  areaId: number;
}
