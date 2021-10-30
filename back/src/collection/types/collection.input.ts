import { InputType, Int, Field } from '@nestjs/graphql';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class CreateCollectionInput {
  @Field()
  naming: string;

  @Field()
  place: string;

  @Field()
  description: string;

  @Field(() => Int)
  natureId: number;
}

@InputType()
export class UpdateCollectionInput extends CreateCollectionInput {
  @Field()
  id: number;
}

@InputType()
export class PaginateCollectionInput extends PaginationInput {
  @Field()
  natureId: number;

  @Field()
  userId: number;
}

@InputType()
export class UpdateCollectionImageInput {
  @Field()
  collectionId: number;
  @Field()
  imageIndex: number;
}

@InputType()
export class CountCollectionInput {
  @Field()
  id: number;
}

@InputType()
export class UserBookInput {
  @Field()
  userId: number;
  @Field()
  year: number;
}
