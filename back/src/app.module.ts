import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';
import { LivingBeingModule } from './living-being/living-being.module';
import { UserModule } from './user/user.module';
import { AdventureModule } from './adventure/adventure.module';
import { VisitModule } from './visit/visit.module';
import { TransactionModule } from './transaction/transaction.module';
import { GraphQLModule } from '@nestjs/graphql';
import { connexionOptions } from './configuration/connexionLoader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LocalizationModule } from './localization/localization.module';
import { AuthModule } from './auth/auth.module';
import { ClassificationModule } from './classification/classification.module';
import { ClassifierModule } from './classifier/classifier.module';
import { AppResolver } from './app.resolver';

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
    UserModule,
    AdventureModule,
    VisitModule,
    TransactionModule,
    LocalizationModule,
    AuthModule,
    ClassificationModule,
    ClassifierModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
