import { InputType, Int, Field } from '@nestjs/graphql';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class CreateAdventureInput {
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
export class UpdateAdventureInput extends CreateAdventureInput {
  @Field()
  id: number;
}

@InputType()
export class PaginateAdventureInput extends PaginationInput {
  @Field()
  natureId: number;

  @Field({ nullable: true })
  userId: number;
}

@InputType()
export class PaginateAdventuresInput extends PaginationInput {
  @Field(() => [Number])
  natureIds: number[];
  @Field()
  sortBy: string;
  @Field()
  order: 'ASC' | 'DESC';
  @Field({ nullable: true })
  userId: number;
}

@InputType()
export class UpdateAdventureImageInput {
  @Field()
  adventureId: number;
  @Field()
  imageIndex: number;
}

@InputType()
export class CountAdventureInput {
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
