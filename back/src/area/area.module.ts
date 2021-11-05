import { Global, Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaResolver } from './area.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './area.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreaResolver, AreaService],
  exports: [AreaService],
})
export class AreaModule {}
