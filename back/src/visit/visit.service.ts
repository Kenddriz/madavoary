import { Injectable } from '@nestjs/common';
import { CreateVisitInput } from './dto/create-visit.input';
import { UpdateVisitInput } from './dto/update-visit.input';

@Injectable()
export class VisitService {
  create(createVisitInput: CreateVisitInput) {
    return 'This action adds a new visit';
  }

  findAll() {
    return `This action returns all visit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visit`;
  }

  update(id: number, updateVisitInput: UpdateVisitInput) {
    return `This action updates a #${id} visit`;
  }

  remove(id: number) {
    return `This action removes a #${id} visit`;
  }
}
