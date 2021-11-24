import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';
import { LivingBeingModule } from './living-being/living-being.module';
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
import { AuthModule } from './auth/auth.module';
import { ClassificationModule } from './classification/classification.module';

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
    AreaModule,
    LivingBeingModule,
    PersonModule,
    UserModule,
    CollectionModule,
    VisitModule,
    SubscriptionModule,
    LocalizationModule,
    AuthModule,
    ClassificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
