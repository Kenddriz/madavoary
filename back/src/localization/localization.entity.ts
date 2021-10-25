import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Species } from '../species/species.entity';
import { Area } from '../area/area.entity';

@ObjectType()
@Entity({ name: 'localizations' })
export class Localization {
  @Field(() => Area)
  @ManyToOne(() => Area, { primary: true, onDelete: 'CASCADE' })
  area: Area;
  @RelationId((localization: Localization) => localization.area)
  areaId: number;

  @Field(() => Species)
  @ManyToOne(() => Species, { primary: true, onDelete: 'CASCADE' })
  species: Species;
  @RelationId((localization: Localization) => localization.species)
  speciesId: number;

  @Field(() => [String])
  @Column({ default: [], type: 'varchar', array: true })
  places: string[];
}
