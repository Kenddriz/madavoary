import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDiscoverInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
