import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkModule } from './park/park.module';
import { SpeciesModule } from './species/species.module';
import { DiscoverModule } from './discover/discover.module';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';
import { VisitModule } from './visit/visit.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { GraphQLModule } from '@nestjs/graphql';
import { connexionOptions } from './configuration/connexionLoader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LocalizationModule } from './localization/localization.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => await connexionOptions(),
    }),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      playground: process.env.NODE_ENV === 'development',
      installSubscriptionHandlers: true,
    }),
    ParkModule,
    SpeciesModule,
    DiscoverModule,
    PersonModule,
    UserModule,
    CollectionModule,
    VisitModule,
    SubscriptionModule,
    LocalizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
