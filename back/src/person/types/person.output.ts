import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PersonOutput {
  @Field(() => Int)
  id: number;
}
