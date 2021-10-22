import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'subscriptions' })
export class Subscription {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Field()
  @Column({ type: 'timestamp' })
  verifiedAt: Date;
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
