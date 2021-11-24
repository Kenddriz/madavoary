import { Args, Int, Mutation, Resolver, Root } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from './person.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../shared/shared.input';
import { removeFile, upload } from '../utils';
import { RelationId } from 'typeorm';

@Resolver(() => Person)
export class PersonResolver {
  constructor(
    private personService: PersonService,
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
}
