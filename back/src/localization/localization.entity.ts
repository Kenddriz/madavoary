import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'localizations' })
export class Localization {
  @Field()
  @PrimaryColumn()
  areaId: number;

  @Field()
  @PrimaryColumn()
  livingBeingId: number;
}
