import { Injectable } from '@nestjs/common';
import { CreateParkInput } from './dto/create-park.input';
import { UpdateParkInput } from './dto/update-park.input';

@Injectable()
export class ParkService {
  create(createParkInput: CreateParkInput) {
    return 'This action adds a new park';
  }

  findAll() {
    return `This action returns all park`;
  }

  findOne(id: number) {
    return `This action returns a #${id} park`;
  }

  update(id: number, updateParkInput: UpdateParkInput) {
    return `This action updates a #${id} park`;
  }

  remove(id: number) {
    return `This action removes a #${id} park`;
  }
}
