import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVisitInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
