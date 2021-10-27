import { InputType, Field } from '@nestjs/graphql';
import { PersonInput } from '../../person/types/person.input';

@InputType()
export class CreateUserInput extends PersonInput {
  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  username: string;
}
@InputType()
export class UpdatePasswordInput {
  @Field()
  currentPassword: string;
  @Field()
  newPassword: string;
}
