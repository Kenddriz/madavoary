import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'collections' })
export class Collection {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'int', name: 'nature_id' })
  natureId: number;

  @Field()
  @Column()
  naming: string;

  @Field()
  @Column()
  place: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  images: string[];

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
