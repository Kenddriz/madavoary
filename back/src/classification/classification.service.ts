import { Injectable } from '@nestjs/common';
import { CreateClassificationInput } from './dto/create-classification.input';
import { UpdateClassificationInput } from './dto/update-classification.input';

@Injectable()
export class ClassificationService {
  create(createClassificationInput: CreateClassificationInput) {
    return 'This action adds a new classification';
  }

  findAll() {
    return `This action returns all classification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classification`;
  }

  update(id: number, updateClassificationInput: UpdateClassificationInput) {
    return `This action updates a #${id} classification`;
  }

  remove(id: number) {
    return `This action removes a #${id} classification`;
  }
}
