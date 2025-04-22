import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { ProductCategoryStatus } from '../product-category.entity';

@InputType()
export class UpdateProductCategoryInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => ProductCategoryStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ProductCategoryStatus)
  status?: ProductCategoryStatus;
}

export class UpdateProductCategoryDto extends UpdateProductCategoryInput {}
