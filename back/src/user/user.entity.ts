import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Person } from '../person/person.entity';
import { Area } from '../area/area.entity';
import { Species } from '../species/species.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  verifiedAt?: Date;

  @Field()
  @Column({ type: 'varchar', length: 7, default: 'invited' })
  role: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  disabled: boolean;

  @Field(() => Person)
  @OneToOne(() => Person, (person) => person.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  person: Person;
  @RelationId((user: User) => user.person)
  personId: number;

  @OneToMany(() => Area, (area) => area.user, { onDelete: 'CASCADE' })
  areas: Area[];

  @OneToMany(() => Species, (species) => species.user, { onDelete: 'CASCADE' })
  species: Species[];
}
