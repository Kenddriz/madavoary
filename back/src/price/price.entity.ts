import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cost } from './dto/price.output';

@ObjectType()
@Entity({ name: 'prices' })
export class Price {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Cost])
  @Column({ type: 'jsonb' })
  malagasy: Cost[];

  @Field(() => [Cost])
  @Column({ type: 'jsonb' })
  foreigner: Cost[];
}
