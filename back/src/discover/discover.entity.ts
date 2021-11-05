import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Person } from '../person/person.entity';
import { LivingBeing } from '../living-being/living-being.entity';

@ObjectType()
@Entity({ name: 'discovers' })
export class Discover {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'date' })
  when: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  validatedAt?: Date;

  @Field(() => Person)
  @ManyToOne(() => Person, (person) => person.discovers, {
    onDelete: 'CASCADE',
  })
  person: Person;
  @RelationId((discover: Discover) => discover.person)
  personId: number;

  @Field(() => LivingBeing)
  @OneToOne(() => LivingBeing, (livingBeing) => livingBeing.discover, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'livingBeingId' })
  livingBeing: LivingBeing;
  @RelationId((discover: Discover) => discover.livingBeing)
  livingBeingId: number;
}
