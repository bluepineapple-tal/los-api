import { IsEnum, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { ProductStatus } from 'src/products/products.enum';

@InputType()
export class UpdateProductMakeInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => ProductStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}

export class UpdateProductMakeDto extends UpdateProductMakeInput {}
