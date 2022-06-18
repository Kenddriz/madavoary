import { Field, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { Visit } from '../visit.entity';

@ObjectType()
export class VisitPagination {
  @Field(() => [Visit])
  items: Visit[];
  @Field(() => Meta)
  meta: Meta;
}
