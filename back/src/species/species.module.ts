import { Global, Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesResolver } from './species.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './species.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  providers: [SpeciesResolver, SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}
