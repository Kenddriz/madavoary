import { CreateDiscoverInput } from './create-discover.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDiscoverInput extends PartialType(CreateDiscoverInput) {
  @Field(() => Int)
  id: number;
}
