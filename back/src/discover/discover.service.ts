import { Injectable } from '@nestjs/common';
import { CreateDiscoverInput } from './dto/create-discover.input';
import { UpdateDiscoverInput } from './dto/update-discover.input';

@Injectable()
export class DiscoverService {
  create(createDiscoverInput: CreateDiscoverInput) {
    return 'This action adds a new discover';
  }

  findAll() {
    return `This action returns all discover`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discover`;
  }

  update(id: number, updateDiscoverInput: UpdateDiscoverInput) {
    return `This action updates a #${id} discover`;
  }

  remove(id: number) {
    return `This action removes a #${id} discover`;
  }
}
