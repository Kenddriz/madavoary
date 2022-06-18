import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class TransactionInput {
  @Field(() => Int)
  type: number;
  @Field(() => Int)
  method: number;
  @Field(() => Int)
  amount: number;
  @Field(() => [String])
  photos: string[];
}
