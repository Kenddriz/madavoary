import { Global, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonResolver, PersonService],
})
export class PersonModule {}
