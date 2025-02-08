import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { Field, Float, InputType } from '@nestjs/graphql';

import { ProductStatus } from '../product.entity';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => ProductStatus, { defaultValue: ProductStatus.ACTIVE })
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  vendorId: string; // To associate with a Vendor
}

// For REST usage, we can just export a class with the same fields
export class CreateProductDto extends CreateProductInput {}
