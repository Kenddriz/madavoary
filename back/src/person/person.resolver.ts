import { Args, Int, Mutation, Resolver, Root } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from './person.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../shared/shared.input';
import { removeFile, upload } from '../utils';
import { DiscoverService } from '../discover/discover.service';
import { RelationId } from 'typeorm';
import { Discover } from '../discover/discover.entity';

@Resolver(() => Person)
export class PersonResolver {
  constructor(
    private personService: PersonService,
    private discoverService: DiscoverService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Person)
  async updatePersonAvatar(
    @Args({ name: 'avatar', type: () => GraphQLUpload }) file: Upload,
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<Person> {
    const person = await this.personService.findOneById(id);
    removeFile('avatars/persons/' + person.avatar);
    const { filename } = await upload(file, 'avatars/persons', person.id);
    person.avatar = filename;
    return this.personService.save(person);
  }

  @RelationId(() => [Discover])
  async discovers(@Root() person: Person): Promise<Discover[]> {
    return this.discoverService.findByPerson(person.id);
  }
}
