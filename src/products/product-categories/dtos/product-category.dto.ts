import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ProductCategoryStatus } from '../product-category.entity';

registerEnumType(ProductCategoryStatus, {
  name: 'ProductCategoryStatus',
});

@ObjectType()
export class ProductCategoryDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ProductCategoryStatus)
  status: ProductCategoryStatus;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
