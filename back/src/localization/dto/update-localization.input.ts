import { CreateLocalizationInput } from './create-localization.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLocalizationInput extends PartialType(CreateLocalizationInput) {
  @Field(() => Int)
  id: number;
}
