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
import { Species } from '../species/species.entity';

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

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  description: string[];

  @Field(() => Person)
  @ManyToOne(() => Person, (person) => person.discovers, {
    onDelete: 'CASCADE',
  })
  person: Person;
  @RelationId((discover: Discover) => discover.person)
  personId: number;

  @Field(() => Species)
  @OneToOne(() => Species, (species) => species.discover, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'speciesId' })
  species: Species;
  @RelationId((discover: Discover) => discover.species)
  speciesId: number;
}
