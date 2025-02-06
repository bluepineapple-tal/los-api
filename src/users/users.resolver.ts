import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from './dtos/create-user.dto'; // GraphQL @InputType
import { UpdateUserInput } from './dtos/update-user-dto'; // GraphQL @InputType
import { UserDTO } from './dtos/user.dto'; // GraphQL @ObjectType
import { UsersService } from './users.service';

@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserDTO], { name: 'users' })
  async findAll(): Promise<UserDTO[]> {
    return this.usersService.findAll();
  }

  @Query(() => UserDTO, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<UserDTO> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserDTO)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserDTO> {
    return this.usersService.create(input);
  }

  @Mutation(() => UserDTO)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<UserDTO> {
    return this.usersService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.usersService.remove(id);
  }
}
