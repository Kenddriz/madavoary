import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Classification } from '../classification/classification.entity';

@ObjectType()
@Entity({ name: 'classifiers' })
export class Classifier {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 35, unique: true })
  label: string;

  @Field(() => Int)
  @Column({ type: 'int', width: 2 })
  level: number;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  translations: string[]; /**First index value is scientific*/

  @ManyToOne(() => Classifier, (classification) => classification.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: Classifier;
  @Field(() => Int, { nullable: true })
  @RelationId((classification: Classifier) => classification.parent)
  parentId?: number;

  @Field(() => [Classification])
  @OneToMany(
    () => Classification,
    (classification) => classification.livingBeing,
    {
      onDelete: 'CASCADE',
    },
  )
  classification: Classification[];

  @Field(() => [Classifier], { defaultValue: [] })
  children: Classifier[];
}
