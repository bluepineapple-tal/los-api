import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductModelInput } from './dtos/create-product-model.dto';
import { ProductModelDTO } from './dtos/product-model.dto';
import { UpdateProductModelInput } from './dtos/update-product-model.dto';
import { ProductModelService } from './product-model.service';

@Resolver(() => ProductModelDTO)
export class ProductModelResolver {
  constructor(private readonly modelService: ProductModelService) {}

  @Query(() => [ProductModelDTO], { name: 'productModels' })
  async findAll(): Promise<ProductModelDTO[]> {
    // Return the array of Product Model entities as ProductModelDTO
    return this.modelService.findAll();
  }

  @Query(() => ProductModelDTO, { name: 'productModel' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductModelDTO> {
    return this.modelService.findOne(id);
  }

  @Query(() => [ProductModelDTO], { name: 'productModelsByMake' })
  async findByMake(
    @Args('makeId', { type: () => ID }) makeId: string,
  ): Promise<ProductModelDTO[]> {
    return this.modelService.findByMake(makeId);
  }

  @Mutation(() => ProductModelDTO)
  async createProductModel(
    @Args('input') input: CreateProductModelInput,
  ): Promise<ProductModelDTO> {
    return this.modelService.create(input);
  }

  @Mutation(() => ProductModelDTO)
  async updateProductModel(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProductModelInput,
  ): Promise<ProductModelDTO> {
    return this.modelService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeProductModel(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.modelService.remove(id);
  }
}
