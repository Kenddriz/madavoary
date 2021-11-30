import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateClassifierInput {
  @Field()
  label: string;
  @Field(() => [String])
  translations: string[];
  @Field(() => Int)
  level: number;
  @Field(() => Int, { nullable: true })
  parentId: number;
}
@InputType()
export class UpdateClassifierInput extends PartialType(
  OmitType(CreateClassifierInput, ['level', 'parentId'] as const),
) {
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
