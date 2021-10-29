import { Injectable } from '@nestjs/common';
import { CreateSpeciesInput } from './dto/create-species.input';
import { UpdateSpeciesInput } from './dto/update-species.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './species.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private repository: Repository<Species>,
  ) {}
  create(createSpeciesInput: CreateSpeciesInput) {
    return 'This action adds a new species';
  }

  findAll() {
    return `This action returns all species`;
  }

  findOne(id: number) {
    return `This action returns a #${id} species`;
  }
  async findOneById(id: number): Promise<Species> {
    return this.repository.findOne({ id });
  }

  update(id: number, updateSpeciesInput: UpdateSpeciesInput) {
    return `This action updates a #${id} species`;
  }

  remove(id: number) {
    return `This action removes a #${id} species`;
  }
}
