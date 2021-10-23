import { Module } from '@nestjs/common';
import { DiscoverService } from './discover.service';
import { DiscoverResolver } from './discover.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discover } from './discover.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discover])],
  providers: [DiscoverResolver, DiscoverService],
})
export class DiscoverModule {}
