import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'collections' })
export class Collection {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'int' })
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

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
  @Field()
  @RelationId((collection: Collection) => collection.user)
  userId: number;
}
