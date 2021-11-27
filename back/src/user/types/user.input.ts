import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class CreateUserInput {
  @Field()
  password: string;
  @Field()
  lastName: string;

  @Field()
  firstName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  gender: 0 | 1;
}

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password'] as const),
) {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  role: number;
  @Field(() => Boolean)
  active: boolean;
}
@InputType()
export class UpdatePasswordInput {
  @Field()
  currentPassword: string;
  @Field()
  newPassword: string;
}

@InputType()
export class PaginateUserInput extends PaginationInput {
  @Field(() => [String])
  filter: string[]; /*[field, value]**/
}
