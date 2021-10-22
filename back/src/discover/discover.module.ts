import { Module } from '@nestjs/common';
import { DiscoverService } from './discover.service';
import { DiscoverResolver } from './discover.resolver';

@Module({
  providers: [DiscoverResolver, DiscoverService]
})
export class DiscoverModule {}
