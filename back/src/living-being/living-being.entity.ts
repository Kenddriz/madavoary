import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Discover } from '../discover/discover.entity';
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

  @Field(() => [Number])
  @Column({ type: 'varchar', array: true })
  localNames: string[];

  @Field(() => [Number])
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

  @Field(() => Discover, { nullable: true })
  @OneToOne(() => Discover, (discover) => discover.livingBeing, {
    onDelete: 'CASCADE',
  })
  discover?: Discover;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.livingBeing, { onDelete: 'CASCADE' })
  user: User;
  @RelationId((livingBeing: LivingBeing) => livingBeing.user)
  userId: number;
  /**classification
  @Column({ default: 0 })
  domainId: number;

  @Column({ default: [], type: 'int', array: true })
  kingdomIds: number[];

  @Column({ default: [], type: 'int', array: true })
  phylumIds: number[];

  @Column({ default: [], type: 'int', array: true })
  classIds: number[];

  @Column({ default: [], type: 'int', array: true })
  orderIds: number[];

  @Column({ default: [], type: 'int', array: true })
  familyIds: number[];

  @Column({ default: [], type: 'int', array: true })
  speciesId: number[];**/
}
