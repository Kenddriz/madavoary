import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePriceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
