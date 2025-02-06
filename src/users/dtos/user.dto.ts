import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { UserRole, UserStatus } from '../../entities/user.entity';

registerEnumType(UserRole, {
  name: 'UserRole',
});

registerEnumType(UserStatus, {
  name: 'UserStatus',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => UserStatus)
  status: UserStatus;

  // Additional fields you want to expose via GraphQL
  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  // If you want to expose vendor or consumer subfields, you can define them or create separate types.
}
