import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassificationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
