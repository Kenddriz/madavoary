import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './types/user.input';
import { Person } from '../person/person.entity';
import { hashSync } from 'bcrypt';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../shared/shared.input';
import { uniqId, upload } from '../utils';
import { PersonService } from '../person/person.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private personService: PersonService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'avatar', type: () => GraphQLUpload }) file: Upload,
    @Args({ name: 'input', type: () => CreateUserInput })
    input: CreateUserInput,
  ): Promise<User> {
    const { password, ...res } = input;
    let person = await this.personService.findOneByContact(
      res.email,
      res.phone,
    );
    if (person)
      throw new Error(person.email === res.email ? 'emailExist' : 'phoneExist');
    const user = new User();
    user.password = hashSync(password, 10);
    user.id = await uniqId('User');
    person = new Person();
    Object.assign(person, res);
    const { filename } = await upload(file, 'avatars/users', user.id);
    person.avatar = filename;
    user.person = person;
    return this.userService.save(user);
  }
}
