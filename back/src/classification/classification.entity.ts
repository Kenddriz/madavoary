import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'classifications' })
export class Classification {
  @Field(() => Int)
  @PrimaryColumn()
  id: string;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  labels: string[]; /**First index value is scientific*/

  @Field(() => Classification, { nullable: true })
  @OneToOne(() => Classification, (classification) => classification.parent, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: Classification;
  @RelationId((classification: Classification) => classification.parent)
  parentId: number;
}
