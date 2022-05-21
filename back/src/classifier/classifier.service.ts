import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classifier } from './classifier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassifierService {
  constructor(
    @InjectRepository(Classifier)
    private repository: Repository<Classifier>,
  ) {}
  async save(classifier: Classifier): Promise<Classifier> {
    return this.repository.save(classifier);
  }

  async findAll(): Promise<Classifier[]> {
    return this.repository.find({ order: { level: 'ASC' } });
  }

  async findOneById(id: number): Promise<Classifier> {
    return this.repository.findOne(id);
  }

  async findByIds(ids: number[]): Promise<Classifier[]> {
    return this.repository.findByIds(ids);
  }

  async findByLivingBeing(LivingBeingId: number): Promise<Classifier[]> {
    return this.repository
      .createQueryBuilder('classifier')
      .innerJoin('classifications', 'cl', 'cl."classifierId" = classifier.id')
      .where('cl."livingBeingId" = :LivingBeingId', { LivingBeingId })
      .orderBy('classifier.label', 'ASC')
      .getMany();
  }
  remove(id: number) {
    return `This action removes a #${id} classifier`;
  }
}
