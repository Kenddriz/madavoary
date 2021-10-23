import { PersonInput } from './person.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class PersonOutput extends PartialType(PersonInput) {
  @Field(() => Int)
  id: number;
}
