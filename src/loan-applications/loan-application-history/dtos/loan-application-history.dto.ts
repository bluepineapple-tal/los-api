import { UserDTO } from 'src/users/dtos/user.dto';

import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ApplicationStatus } from '../../loan-application.entity';

registerEnumType(ApplicationStatus, { name: 'ApplicationStatus' });

@ObjectType()
export class LoanApplicationHistoryDTO {
  @Field(() => ID)
  id: string;

  @Field(() => ApplicationStatus)
  old_status: ApplicationStatus;

  @Field(() => ApplicationStatus)
  new_status: ApplicationStatus;

  @Field({ nullable: true })
  change_note?: string;

  @Field()
  changed_at: Date;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => UserDTO, { nullable: true })
  changed_by?: UserDTO;
}
