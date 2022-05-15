import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Localization } from '../localization/localization.entity';
import { Classification } from '../classification/classification.entity';

@ObjectType()
@Entity({ name: 'livingBeings' })
export class LivingBeing {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  images: string[];

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  localNames: string[];

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  names: string[];

  @Field()
  @Column({ type: 'boolean' })
  endemic: boolean;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  specificities: string[];

  @Field()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;

  @Field(() => [Localization])
  @OneToMany(() => Localization, (localization) => localization.livingBeing, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  localizations: Localization[];

  @Field(() => [Classification])
  @OneToMany(
    () => Classification,
    (classification) => classification.livingBeing,
    {
      onDelete: 'CASCADE',
    },
  )
  classification: Classification[];
}
