import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateParkInput {
  @Field()
  name: string;
}
