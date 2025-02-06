import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './dtos/user.dto'; // GraphQL @ObjectType
import { CreateUserInput } from './dtos/create-user.dto'; // GraphQL @InputType
import { UpdateUserInput } from './dtos/update-user-dto'; // GraphQL @InputType

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.usersService.remove(id);
  }
}
