import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { Collection } from '../collection.entity';

@ObjectType()
export class CollectionPagination {
  @Field(() => [Collection])
  items: Collection[];
  @Field(() => Meta)
  meta: Meta;
}
@ObjectType()
export class CountCollectionsOutput {
  @Field(() => Int)
  natureId: number;
  @Field(() => Int)
  count: number;
}
