import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoanOfferDTO {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  interest_rate: number;

  @Field()
  tenure_months: number;

  @Field(() => Float)
  processing_fee: number;

  @Field()
  offer_name: string;

  @Field({ nullable: true })
  offer_details?: string;

  @Field()
  is_active: boolean;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  // Optionally, we can embed Product info or CreatedBy user details if you want
  // to resolve them in GraphQL. For example:
  // @Field(() => ProductDTO, { nullable: true })
  // product?: ProductDTO;
}
