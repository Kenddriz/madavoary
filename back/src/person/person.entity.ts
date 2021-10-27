import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Discover } from '../discover/discover.entity';

@ObjectType()
@Entity({ name: 'persons' })
export class Person {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
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

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.person, {
    onDelete: 'CASCADE',
  })
  user?: User;

  @Field(() => [Discover])
  @OneToMany(() => Discover, (discover) => discover.person, {
    onDelete: 'CASCADE',
  })
  discover: Discover;
}
