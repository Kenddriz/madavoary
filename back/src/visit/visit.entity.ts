import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Geo } from '../area/types/area.output';

@ObjectType()
@Entity({ name: 'visits' })
export class Visit {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 60, default: '' })
  city: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 60, default: '' })
  country: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 8, default: '' })
  countryCode: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 180, default: '' })
  region: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 15, default: '' })
  ip: string;

  @Field(() => Geo)
  @Column({ type: 'point', default: () => 'Point(0,0)' })
  geo: Geo;

  @Field()
  @CreateDateColumn({ name: 'entered_at', type: 'timestamp' })
  enteredAt: Date;

  @Field({ nullable: true })
  @Column({ name: 'lived_at', type: 'timestamp', nullable: true })
  livedAt: Date;
}
