import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Classifier } from '../classifier/classifier.entity';
import { Area } from '../area/area.entity';

@ObjectType()
@Entity({ name: 'livingBeings' })
export class LivingBeing {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  images: string[];

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  names: string[];

  @Field()
  @Column({ type: 'boolean' })
  endemic: boolean;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  descriptions: string[];

  @Field()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;

  @Field(() => [Area])
  @ManyToMany(() => Area, { onDelete: 'CASCADE', primary: true })
  @JoinTable({
    name: 'localizations',
    joinColumn: { name: 'livingBeingId' },
    inverseJoinColumn: { name: 'areaId' },
  })
  areas: Area[];

  @Field(() => [Classifier])
  @ManyToMany(() => Classifier, {
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinTable({
    name: 'classifications',
    joinColumn: { name: 'livingBeingId' },
    inverseJoinColumn: { name: 'classifierId' },
  })
  classifiers: Classifier[];
}
