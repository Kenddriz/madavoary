import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { Adventure } from '../adventure.entity';

@ObjectType()
export class AdventurePagination {
  @Field(() => [Adventure])
  items: Adventure[];
  @Field(() => Meta)
  meta: Meta;
}

@ObjectType()
export class AdventuresPagination {
  @Field(() => [Adventure])
  items: Adventure[];
  @Field(() => Meta)
  meta: Meta;
}

@ObjectType()
export class CountAdventuresOutput {
  @Field(() => Int)
  natureId: number;
  @Field(() => Int)
  count: number;
}
