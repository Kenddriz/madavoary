import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'timestamp' })
  verifiedAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 7, default: 'invited' })
  role: string;
}
