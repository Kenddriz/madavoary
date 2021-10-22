import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'Species' })
export class Species {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  images: string[];

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  when: Date;
}
