import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/user.entity';

@ObjectType()
export class AuthDto {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  phone: string;
}

@ObjectType()
export class LoginDto {
  @Field()
  token: string;
  @Field(() => User)
  user: User;
}
