import { Injectable } from '@nestjs/common';
import { CreateDiscoverInput } from './dto/create-discover.input';
import { UpdateDiscoverInput } from './dto/update-discover.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Discover } from './discover.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscoverService {
  constructor(
    @InjectRepository(Discover)
    private repository: Repository<Discover>,
  ) {}
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
  async findByPerson(personId: number): Promise<Discover[]> {
    return this.repository
      .createQueryBuilder('disc')
      .where('disc.personId = :personId', { personId })
      .orderBy('disc.when', 'DESC')
      .getMany();
  }
  async findBySpecies(speciesId: number): Promise<Discover> {
    return this.repository
      .createQueryBuilder('disc')
      .where('disc.speciesId = :speciesId', { speciesId })
      .getOne();
  }
}
