import { Module } from '@nestjs/common';
import { AdventureService } from './adventure.service';
import { AdventureResolver } from './adventure.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adventure } from './adventure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adventure])],
  providers: [AdventureResolver, AdventureService],
})
export class AdventureModule {}
