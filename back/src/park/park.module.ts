import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkResolver } from './park.resolver';

@Module({
  providers: [ParkResolver, ParkService]
})
export class ParkModule {}
