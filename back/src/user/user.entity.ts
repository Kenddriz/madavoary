import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  verifiedAt?: Date;

  @Field()
  @Column({ type: 'int', width: 1, default: 0 })
  role: number;

  @Field()
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Field()
  @Column({ type: 'varchar', length: 60 })
  lastName: string;

  @Field()
  @Column({ type: 'varchar', length: 60, default: '' })
  firstName: string;

  @Field()
  @Column({ type: 'varchar', length: 60, unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string;

  @Field()
  @Column({ type: 'varchar', length: 20 })
  avatar: string;

  @Field()
  @Column({ type: 'int', width: 1 })
  gender: 0 | 1;

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
