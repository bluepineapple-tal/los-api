import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { Field, Float, InputType } from '@nestjs/graphql';
import { ProductStatus } from 'src/products/products.enum';

@InputType()
export class CreateProductModelInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  makeId: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => ProductStatus, { defaultValue: ProductStatus.ACTIVE })
  @IsEnum(ProductStatus)
  status: ProductStatus;
}

// For REST usage, we can just export a class with the same fields
export class CreateProductModelDto extends CreateProductModelInput {}
