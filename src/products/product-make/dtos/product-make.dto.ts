import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductStatus } from 'src/products/products.enum';

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
});

@ObjectType()
export class ProductMakeDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
