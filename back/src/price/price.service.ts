import { Injectable } from '@nestjs/common';
import { CreatePriceInput } from './dto/create-price.input';
import { PriceOutput } from './dto/price.output';

@Injectable()
export class PriceService {
  create(createPriceInput: CreatePriceInput) {
    return 'This action adds a new price';
  }

  findAll() {
    return `This action returns all price`;
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceInput: PriceOutput) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
