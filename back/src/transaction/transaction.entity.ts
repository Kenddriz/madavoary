import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'transactions' })
export class Transaction {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  type: number;

  @Field(() => Float)
  @Column({ type: 'float' })
  amount: number;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  photos: string[];

  @Field(() => Int)
  @Column({ type: 'int' })
  method: number;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;
  @RelationId((transaction: Transaction) => transaction.user)
  userId: number;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date;

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
