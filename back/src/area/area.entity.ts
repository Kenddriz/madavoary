import { ObjectType, Field, Int } from '@nestjs/graphql';
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
import { Peripheral } from './types/area.output';
import { Localization } from '../localization/localization.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'areas' })
export class Area {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Field(() => Int)
  @Column({ type: 'int', width: 1, default: 0 })
  type: number;

  @Field()
  @Column({ type: 'varchar', length: 26, default: '' })
  banner: string;

  @Field()
  @Column({ type: 'varchar', length: 25, default: '' })
  region: string;

  @Field(() => [Peripheral])
  @Column({ default: [], type: 'jsonb' })
  peripherals: Peripheral[]; /**peripheral cities*/

  @Field()
  @Column({ type: 'float', width: 5, default: 0 })
  surface: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Localization, (localization) => localization.area, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  localizations: Localization[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.areas, { onDelete: 'CASCADE' })
  user: User;
  @RelationId((area: Area) => area.user)
  userId: number;
}
