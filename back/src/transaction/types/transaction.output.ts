import { ObjectType, Int, Field } from '@nestjs/graphql';

@ObjectType()
export class Revenue5LastYears {
  @Field(() => Int)
  type: number;
  @Field(() => Int)
  amount: number;
  @Field(() => Int)
  year: number;
}
