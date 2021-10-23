import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitResolver } from './visit.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit])],
  providers: [VisitResolver, VisitService],
})
export class VisitModule {}
