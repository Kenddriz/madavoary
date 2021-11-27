import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassifierInput {
  @Field()
  label: string;
  @Field(() => [String])
  translations: string[];
  @Field(() => Int)
  level: number;
  @Field(() => Int, { nullable: true })
  parentId?: number;
}
@InputType()
export class UpdateClassifierInput extends CreateClassifierInput {
  @Field(() => Int)
  id: number;
}
@InputType()
export class MoveClassifierInput {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  parentId: number;
}
