import { Field, Float, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { ProductStatus } from '../../entities/product.entity';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

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

  // If you allow changing vendor:
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  vendorId?: string;
}

export class UpdateProductDto extends UpdateProductInput {}
