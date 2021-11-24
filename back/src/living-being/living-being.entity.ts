import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Localization } from '../localization/localization.entity';
import { User } from '../user/user.entity';

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

  @Field()
  @Column({ type: 'boolean' })
  endangered: boolean;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  characteristics: string[];

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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.livingBeing, { onDelete: 'CASCADE' })
  user: User;
  @RelationId((livingBeing: LivingBeing) => livingBeing.user)
  userId: number;
  //classification
  @Column({ default: 0 })
  domainId: number;

  @Column({ default: [], type: 'varchar', array: true })
  kingdomIds: string[];

  @Column({ default: [], type: 'varchar', array: true })
  phylumIds: string[];

  @Column({ default: [], type: 'varchar', array: true })
  classIds: string[];

  @Column({ default: [], type: 'varchar', array: true })
  orderIds: string[];

  @Column({ default: [], type: 'varchar', array: true })
  familyIds: string[];

  @Column({ default: [], type: 'varchar', array: true })
  genusIds: string[];

  @Column({ default: [], type: 'varchar', array: true })
  speciesId: string[];
}
