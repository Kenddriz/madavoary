import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Peripheral {
  @Field()
  city: string;
  @Field()
  distance: number;
}
@ObjectType()
export class Geo {
  @Field(() => Float)
  x: number;
  @Field(() => Float)
  y: number;
}
