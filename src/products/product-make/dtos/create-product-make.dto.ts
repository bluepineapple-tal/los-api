import { IsEnum, IsNotEmpty } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { ProductStatus } from 'src/products/products.enum';

@InputType()
export class CreateProductMakeInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => ProductStatus, { defaultValue: ProductStatus.ACTIVE })
  @IsEnum(ProductStatus)
  status: ProductStatus;
}

// For REST usage, we can just export a class with the same fields
export class CreateProductMakeDto extends CreateProductMakeInput {}
