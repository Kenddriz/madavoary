import { InputType, Field } from '@nestjs/graphql';
import { GeoInput } from '../../area/types/area.input';

@InputType()
export class CreateVisitInput {
  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  countryCode: string;

  @Field(() => String)
  region: string;

  @Field(() => String)
  ip: string;

  @Field(() => GeoInput)
  geo: GeoInput;
}
