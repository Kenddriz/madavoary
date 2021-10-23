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
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column({ default: '' })
  avatar: string;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  images: string[];

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.person, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user?: User;

  @Field(() => [Discover])
  @OneToMany(() => Discover, (discover) => discover.person, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  discover: Discover;
}
