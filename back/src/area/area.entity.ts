import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Peripheral, Geo } from './types/area.output';

@ObjectType()
@Entity({ name: 'areas' })
export class Area {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', unique: true, length: 30 })
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

  @Field(() => [String])
  @Column({ type: 'varchar', array: true, default: [] })
  descriptions: string[];

  @Field(() => [String])
  @Column({ type: 'varchar', array: true, default: [] })
  slogans: string[];

  @Field(() => Geo)
  @Column({ type: 'point', default: () => 'Point(0,0)' })
  geo: Geo;

  @Field()
  @Column({ type: 'float', width: 5, default: 0 })
  surface: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
