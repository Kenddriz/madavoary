import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Park } from '../park/park.entity';
import { Discover } from '../discover/discover.entity';

@ObjectType()
@Entity({ name: 'species' })
export class Species {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  images: string[];

  @Field()
  @Column({ type: 'timestamp' })
  when: Date;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  names: string[];

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  description: string[];

  @Field(() => [Park])
  @ManyToMany(() => Park, (park) => park.species, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable({ name: 'localizations' })
  parks: Park[];

  @Field(() => Discover, { nullable: true })
  @OneToOne(() => Discover, (discover) => discover.species, {
    onDelete: 'CASCADE',
  })
  discover?: Discover;
}
