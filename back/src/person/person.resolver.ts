import { Resolver } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from './person.entity';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}
}
