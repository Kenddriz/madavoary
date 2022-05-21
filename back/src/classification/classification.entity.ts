import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'classifications' })
export class Classification {
  @Field()
  @PrimaryColumn()
  classifierId: number;

  @Field()
  @PrimaryColumn()
  livingBeingId: number;
}
