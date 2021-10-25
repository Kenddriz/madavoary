import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity, ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn, RelationId,
} from 'typeorm';
import { Discover } from '../discover/discover.entity';
import { Localization } from '../localization/localization.entity';
import {User} from "../user/user.entity";
/*Array(0) is english translation, except for names**/
@ObjectType()
@Entity({ name: 'species' })
export class Species {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  images: string[];

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  when: string[];

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  names: string[];

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  description: string[];

  @Field(() => [Localization])
  @OneToMany(() => Localization, (localization) => localization.species, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  localizations: Localization[];

  @Field(() => Discover, { nullable: true })
  @OneToOne(() => Discover, (discover) => discover.species, {
    onDelete: 'CASCADE',
  })
  discover?: Discover;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.species, { onDelete: 'CASCADE' })
  user: User;
  @RelationId((species: Species) => species.user)
  userId: number;
}
