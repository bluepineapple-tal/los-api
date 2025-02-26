import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductMakeInput } from './dtos/create-product-make.dto';
import { ProductMakeDTO } from './dtos/product-make.dto';
import { UpdateProductMakeInput } from './dtos/update-product-make';
import { ProductMakeService } from './product-make.service';

@Resolver(() => ProductMakeDTO)
export class ProductMakeResolver {
  constructor(private readonly makeService: ProductMakeService) {}

  @Query(() => [ProductMakeDTO], { name: 'productMakes' })
  async findAll(): Promise<ProductMakeDTO[]> {
    // Return the array of Product Make entities as ProductMakeDTO
    return this.makeService.findAll();
  }

  @Query(() => ProductMakeDTO, { name: 'productMake' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductMakeDTO> {
    return this.makeService.findOne(id);
  }

  @Mutation(() => ProductMakeDTO)
  async createProductMake(
    @Args('input') input: CreateProductMakeInput,
  ): Promise<ProductMakeDTO> {
    return this.makeService.create(input);
  }

  @Mutation(() => ProductMakeDTO)
  async updateProductMake(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProductMakeInput,
  ): Promise<ProductMakeDTO> {
    return this.makeService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeProductMake(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.makeService.remove(id);
  }
}
