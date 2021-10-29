import { Global, Module } from '@nestjs/common';
import { DiscoverService } from './discover.service';
import { DiscoverResolver } from './discover.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discover } from './discover.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Discover])],
  providers: [DiscoverResolver, DiscoverService],
  exports: [DiscoverService],
})
export class DiscoverModule {}
