import { Injectable } from '@nestjs/common';
import { CreateSpeciesInput } from './dto/create-species.input';
import { UpdateSpeciesInput } from './dto/update-species.input';

@Injectable()
export class SpeciesService {
  create(createSpeciesInput: CreateSpeciesInput) {
    return 'This action adds a new species';
  }

  findAll() {
    return `This action returns all species`;
  }

  findOne(id: number) {
    return `This action returns a #${id} species`;
  }

  update(id: number, updateSpeciesInput: UpdateSpeciesInput) {
    return `This action updates a #${id} species`;
  }

  remove(id: number) {
    return `This action removes a #${id} species`;
  }
}
