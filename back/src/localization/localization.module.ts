import { Global, Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { LocalizationResolver } from './localization.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localization } from './localization.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Localization])],
  providers: [LocalizationResolver, LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule {}
