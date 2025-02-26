import { IsNumber } from 'class-validator';
import { ProductStatus } from 'src/products/products.enum';

import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ProductMakeDTO } from 'src/products/product-make/dtos/product-make.dto';

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
});

@ObjectType()
export class ProductModelDTO {
  @Field(() => ID)
  id: string;

  @Field(() => ProductMakeDTO, { nullable: true })
  productMake?: ProductMakeDTO;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
