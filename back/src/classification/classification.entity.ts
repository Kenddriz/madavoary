import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';
import { LivingBeing } from '../living-being/living-being.entity';
import { Classifier } from '../classifier/classifier.entity';

@ObjectType()
@Entity({ name: 'classifications' })
export class Classification {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Classifier)
  @ManyToOne(() => Classifier, { onDelete: 'CASCADE' })
  classifier: Classifier;
  @RelationId((classification: Classification) => classification.classifier)
  classifierId: number;

  @Field(() => LivingBeing)
  @ManyToOne(() => LivingBeing, {
    onDelete: 'CASCADE',
  })
  livingBeing: LivingBeing;
  @RelationId((classification: Classification) => classification.livingBeing)
  livingBeingId: number;
}
