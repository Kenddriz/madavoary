import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocalizationInput {
  @Field(() => Int)
  areaId: number;
  @Field(() => [String])
  places: string[];
}

@InputType()
export class UpdateLocalizationInput extends CreateLocalizationInput {
  @Field(() => Int)
  id: number;
}
