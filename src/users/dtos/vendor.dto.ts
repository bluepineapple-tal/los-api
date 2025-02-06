import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VendorDTO {
  @Field(() => ID)
  id: string;

  @Field()
  business_name: string;

  @Field()
  address: string;

  @Field()
  phone: string;
}
