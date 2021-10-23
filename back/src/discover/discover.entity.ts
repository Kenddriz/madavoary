import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../person/person.entity';
import { Species } from '../species/species.entity';

@ObjectType()
@Entity({ name: 'discovers' })
export class Discover {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'date' })
  date: string;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  description: string[];

  @Field(() => Person)
  @ManyToOne(() => Person, (person) => person.user, {
    onDelete: 'CASCADE',
  })
  person: Person;

  @Field(() => Species)
  @OneToOne(() => Species, (species) => species.discover, {
    onDelete: 'CASCADE',
  })
  species: Species;
}
