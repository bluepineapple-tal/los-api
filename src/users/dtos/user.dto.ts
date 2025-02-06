import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { UserRole, UserStatus } from '../../entities/user.entity';
import { ConsumerDTO } from './consumer.dto';
import { VendorDTO } from './vendor.dto';

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

  // -- Expose the Consumer profile if role == CONSUMER
  @Field(() => ConsumerDTO, { nullable: true })
  consumer?: ConsumerDTO;

  // -- Expose the Vendor profile if role == VENDOR
  @Field(() => VendorDTO, { nullable: true })
  vendor?: VendorDTO;
}
