import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { Field, Float, InputType } from '@nestjs/graphql';
import { ProductStatus } from 'src/products/products.enum';

@InputType()
export class UpdateProductModelInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field()
  @IsUUID()
  @IsOptional()
  makeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  price?: number;

  @Field(() => ProductStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}

export class UpdateProductModelDto extends UpdateProductModelInput {}
