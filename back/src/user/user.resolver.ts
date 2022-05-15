import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import {
  CreateUserInput,
  PaginateUserInput,
  UpdatePasswordInput,
  UpdateUserInput,
} from './types/user.input';
import { compareSync, hashSync } from 'bcrypt';
import { GraphQLUpload } from 'graphql-upload';
import { Upload } from '../shared/shared.input';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { removeFile, uniqId, upload } from '../utils';
import { CurrentUser } from '../auth/current-user-decorator';
import { StrategyType } from '../auth/types/strategy.type';
import { UserPagination } from './types/user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'avatar', type: () => GraphQLUpload }) file: Upload,
    @Args({ name: 'input', type: () => CreateUserInput })
    input: CreateUserInput,
  ): Promise<User> {
    const { password, ...res } = input;
    let user = await this.userService.findOneByContact(res.email, res.phone);
    if (user)
      throw new Error(user.email === res.email ? 'emailExist' : 'phoneExist');
    user = new User();
    user.password = hashSync(password, 10);
    user.id = await uniqId('User');
    Object.assign(user, res);
    const { filename } = await upload(file, 'avatars', user.id);
    user.avatar = filename;
    return this.userService.save(user);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    const { id, ...userInput } = input;
    const user = await this.userService.findOneById(id);
    Object.assign(user, userInput);
    return this.userService.save(user);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { nullable: true })
  async updatePassword(
    @CurrentUser() strategy: StrategyType,
    @Args('input') input: UpdatePasswordInput,
  ): Promise<User> {
    const user = await this.userService.findOneById(strategy.id);
    const matched = await compareSync(input.currentPassword, user.password);
    if (!matched) return null;
    user.password = hashSync(input.newPassword, 10);
    return this.userService.save(user);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserAvatar(
    @Args({ name: 'avatar', type: () => GraphQLUpload }) file: Upload,
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<User> {
    const user = await this.userService.findOneById(id);
    removeFile('avatars' + user.avatar);
    const { filename } = await upload(file, 'avatars', user.id);
    user.avatar = filename;
    return this.userService.save(user);
  }
  @Query(() => UserPagination)
  async paginateUsers(
    @Args('input') input: PaginateUserInput,
  ): Promise<UserPagination> {
    return this.userService.paginate(input);
  }
}
