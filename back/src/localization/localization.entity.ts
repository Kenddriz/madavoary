import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'localizations' })
export class Localization {
  @Field()
  @PrimaryColumn()
  parksId: number;

  @Field()
  @PrimaryColumn()
  speciesId: number;

  @Field()
  @Column()
  place: string;
}
