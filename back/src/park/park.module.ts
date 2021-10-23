import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkResolver } from './park.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Park } from './park.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Park])],
  providers: [ParkResolver, ParkService],
})
export class ParkModule {}
