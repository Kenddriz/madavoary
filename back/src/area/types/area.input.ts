import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class GeoInput {
  @Field(() => Float)
  x: number;
  @Field(() => Float)
  y: number;
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
  @Field(() => [String])
  slogans: string[];
  @Field(() => [String])
  descriptions: string[];
  @Field(() => GeoInput)
  geo: GeoInput;
}

@InputType()
export class UpdateAreaInput extends CreateAreaInput {
  @Field()
  id: number;
}
