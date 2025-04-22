import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { ProductCategoryStatus } from '../product-category.entity';

@InputType()
export class CreateProductCategoryInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => ProductCategoryStatus, {
    defaultValue: ProductCategoryStatus.ACTIVE,
  })
  @IsEnum(ProductCategoryStatus)
  @IsOptional()
  status?: ProductCategoryStatus;
}

export class CreateProductCategoryDto extends CreateProductCategoryInput {}
