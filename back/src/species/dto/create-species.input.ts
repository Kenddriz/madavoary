import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSpeciesInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
