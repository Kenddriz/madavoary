import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  @Field()
  type: number;
  @Field(() => [String])
  list: string[];
}
