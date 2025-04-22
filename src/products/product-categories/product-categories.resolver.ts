import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductCategoryInput } from './dtos/create-product-category.dto';
import { ProductCategoryDto } from './dtos/product-category.dto';
import { UpdateProductCategoryInput } from './dtos/update-product-category.dto';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategory } from './product-category.entity';

@Resolver(() => ProductCategoryDto)
export class ProductCategoriesResolver {
  constructor(private readonly svc: ProductCategoriesService) {}

  @Query(() => [ProductCategoryDto], { name: 'productCategories' })
  findAll(): Promise<ProductCategory[]> {
    return this.svc.findAll();
  }

  @Query(() => ProductCategoryDto, { name: 'productCategory' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductCategory> {
    return this.svc.findOne(id);
  }

  @Mutation(() => ProductCategoryDto)
  createProductCategory(
    @Args('input') input: CreateProductCategoryInput,
  ): Promise<ProductCategory> {
    return this.svc.create(input);
  }

  @Mutation(() => ProductCategoryDto)
  updateProductCategory(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProductCategoryInput,
  ): Promise<ProductCategory> {
    return this.svc.update(id, input);
  }

  @Mutation(() => Boolean)
  removeProductCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.svc.remove(id);
  }
}
