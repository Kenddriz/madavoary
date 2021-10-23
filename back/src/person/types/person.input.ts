import { InputType, PartialType, OmitType } from '@nestjs/graphql';
import { Person } from '../person.entity';

@InputType()
export class PersonInput extends PartialType(
  OmitType(Person, ['id'] as const),
) {}
