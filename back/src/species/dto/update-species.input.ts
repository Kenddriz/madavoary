import { CreateSpeciesInput } from './create-species.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSpeciesInput extends PartialType(CreateSpeciesInput) {
  @Field(() => Int)
  id: number;
}
