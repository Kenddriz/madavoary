import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from './types/area.output';
import { Localization } from '../localization/localization.entity';
import { User } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'areas' })
export class Area {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 6, default: '' })
  banner: string;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  cities: string[]; /**peripheral cities*/

  @Field()
  @Column({ type: 'float', width: 5, default: 0 })
  surface: number;

  @Field(() => [Contact])
  @Column({ type: 'jsonb', default: [] })
  contacts: Contact[];

  @Field()
  @Column({ type: 'varchar', length: 60, default: '' })
  office: string;

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
