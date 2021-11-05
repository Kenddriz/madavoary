import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateLocalizationInput } from '../../localization/types/localization.input';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class CreateLivingBeingInput {
  @Field(() => [String])
  localNames: string[];
  @Field(() => [String])
  characteristics: string[];
  @Field(() => [String])
  names: string[];
  @Field()
  endemic: boolean;
  @Field()
  endangered: boolean;
  @Field(() => CreateLocalizationInput)
  localizationInput: CreateLocalizationInput;
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
