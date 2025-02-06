import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductInput } from './dtos/create-product.dto';
import { ProductDTO } from './dtos/product.dto';
import { UpdateProductInput } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@Resolver(() => ProductDTO)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductDTO], { name: 'products' })
  async findAll(): Promise<ProductDTO[]> {
    // Return the array of Product entities as ProductDTO
    return this.productsService.findAll();
  }

  @Query(() => ProductDTO, { name: 'product' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductDTO> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => ProductDTO)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<ProductDTO> {
    return this.productsService.create(input);
  }

  @Mutation(() => ProductDTO)
  async updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductDTO> {
    return this.productsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.productsService.remove(id);
  }
}
