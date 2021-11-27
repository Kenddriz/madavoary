import { Global, Module } from '@nestjs/common';
import { ClassifierService } from './classifier.service';
import { ClassifierResolver } from './classifier.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classifier } from './classifier.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Classifier])],
  providers: [ClassifierResolver, ClassifierService],
  exports: [ClassifierService],
})
export class ClassifierModule {}
