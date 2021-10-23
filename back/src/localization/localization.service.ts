import { Injectable } from '@nestjs/common';
import { CreateLocalizationInput } from './dto/create-localization.input';
import { UpdateLocalizationInput } from './dto/update-localization.input';

@Injectable()
export class LocalizationService {
  create(createLocalizationInput: CreateLocalizationInput) {
    return 'This action adds a new localization';
  }

  findAll() {
    return `This action returns all localization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localization`;
  }

  update(id: number, updateLocalizationInput: UpdateLocalizationInput) {
    return `This action updates a #${id} localization`;
  }

  remove(id: number) {
    return `This action removes a #${id} localization`;
  }
}
