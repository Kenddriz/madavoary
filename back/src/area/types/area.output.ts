import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Peripheral {
  @Field()
  city: string;
  @Field()
  distance: number;
}
