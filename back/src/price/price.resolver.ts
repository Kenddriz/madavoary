import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PriceService } from './price.service';
import { Price } from './price.entity';
import { CreatePriceInput } from './dto/create-price.input';
import { PriceOutput } from './dto/price.output';

@Resolver(() => Price)
export class PriceResolver {
  constructor(private readonly priceService: PriceService) {}

  @Mutation(() => Price)
  createPrice(@Args('createPriceInput') createPriceInput: CreatePriceInput) {
    return this.priceService.create(createPriceInput);
  }

  @Query(() => [Price], { name: 'price' })
  findAll() {
    return this.priceService.findAll();
  }

  @Query(() => Price, { name: 'price' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.priceService.findOne(id);
  }

  @Mutation(() => Price)
  updatePrice(@Args('updatePriceInput') updatePriceInput: PriceOutput) {
    return this.priceService.update(updatePriceInput.id, updatePriceInput);
  }

  @Mutation(() => Price)
  removePrice(@Args('id', { type: () => Int }) id: number) {
    return this.priceService.remove(id);
  }
}
