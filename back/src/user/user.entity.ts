import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Person } from '../person/person.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Field()
  @Column({ type: 'timestamp' })
  verifiedAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 7, default: 'invited' })
  role: string;

  @Field(() => Person)
  @OneToOne(() => Person, (person) => person.user, { onDelete: 'CASCADE' })
  person: Person;
  @JoinColumn({ name: 'personId' })
  @RelationId((user: User) => user.person)
  personId: number;
}
