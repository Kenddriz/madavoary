import { CreatePriceInput } from './create-price.input';
import {
  InputType,
  Field,
  Int,
  PartialType,
  ObjectType,
  Float,
} from '@nestjs/graphql';

@InputType()
export class PriceOutput extends PartialType(CreatePriceInput) {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class Cost {
  @Field(() => Int)
  ageSlice: number;
  @Field(() => Float)
  value: number;
}
