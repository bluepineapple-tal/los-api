import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { ProductStatus } from '../../entities/product.entity';

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
});

@ObjectType()
export class ProductDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  // If we want to expose vendor details, we can do it here or create a separate DTO
  // e.g. vendor?: VendorDTO
}
