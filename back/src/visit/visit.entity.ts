import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'visits' })
export class Visit {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
