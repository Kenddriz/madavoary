import { CreateVisitInput } from './create-visit.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVisitInput extends PartialType(CreateVisitInput) {
  @Field(() => Int)
  id: number;
}
