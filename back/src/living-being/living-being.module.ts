import { Global, Module } from '@nestjs/common';
import { LivingBeingService } from './living-being.service';
import { LivingBeingResolver } from './living-being.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivingBeing } from './living-being.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LivingBeing])],
  providers: [LivingBeingResolver, LivingBeingService],
  exports: [LivingBeingService],
})
export class LivingBeingModule {}
