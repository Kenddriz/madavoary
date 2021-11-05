import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Localization } from './localization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalizationService {
  constructor(
    @InjectRepository(Localization)
    private repository: Repository<Localization>,
  ) {}
  async save(localisation: Localization): Promise<Localization> {
    return this.repository.save(localisation);
  }

  findAll() {
    return `This action returns all localization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localization`;
  }
  async findByLivingBeing(livingBeingId: number): Promise<Localization[]> {
    return this.repository
      .createQueryBuilder('loc')
      .where('loc."livingBeingId" = :id', { livingBeingId })
      .getMany();
  }
  update(id: number) {
    return `This action updates a #${id} localization`;
  }

  remove(id: number) {
    return `This action removes a #${id} localization`;
  }
}
