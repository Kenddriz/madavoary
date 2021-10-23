import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { LocalizationResolver } from './localization.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localization } from './localization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Localization])],
  providers: [LocalizationResolver, LocalizationService],
})
export class LocalizationModule {}
