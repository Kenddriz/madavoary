import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { LivingBeing } from '../living-being/living-being.entity';
import { Area } from '../area/area.entity';

@ObjectType()
@Entity({ name: 'localizations' })
export class Localization {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Area, { nullable: true })
  @ManyToOne(() => Area, { primary: true, onDelete: 'CASCADE' })
  area?: Area;
  @RelationId((localization: Localization) => localization.area)
  areaId: number;

  @Field(() => LivingBeing)
  @ManyToOne(() => LivingBeing, {
    primary: true,
    onDelete: 'CASCADE',
  })
  livingBeing: LivingBeing;
  @RelationId((localization: Localization) => localization.livingBeing)
  livingBeingId: number;
}
