import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ContactInput {
  @Field(() => Int)
  type: number;
  @Field(() => [String])
  list: string[];
}
@InputType()
export class PeripheralInput {
  @Field()
  city: string;
  @Field()
  distance: number;
}
@InputType()
export class CreateAreaInput {
  @Field()
  name: string;
  @Field()
  surface: number;
  @Field()
  region: string;
  @Field(() => Int)
  type: number;
  @Field(() => [PeripheralInput])
  peripherals: PeripheralInput[];
}

@InputType()
export class UpdateAreaInput extends CreateAreaInput {
  @Field()
  id: number;
}
