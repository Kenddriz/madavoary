import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { LivingBeing } from '../living-being.entity';

@InputType()
export class LivingBeingOutput {
  @Field(() => Int)
  id: string;
}

@ObjectType()
export class LivingBeingPagination {
  @Field(() => [LivingBeing])
  items: LivingBeing[];
  @Field(() => Meta)
  meta: Meta;
}
