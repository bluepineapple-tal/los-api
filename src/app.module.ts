// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
import { RequestLoggerMiddleware } from 'logger/middlewares/request-logger.middleware';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/typeorm.config';
import { ExternalChecksModule } from './external-checks/external-checks.module';
import { HealthCheckController } from './health-check/health-check.controller';
import { HealthCheckService } from './health-check/health-check.service';
import { LoanApplicationsModule } from './loan-applications/loan-applications.module';
import { LoanOffersModule } from './loan-offers/loan-offers.module';
import { ProductsModule } from './products/products.module';
import { UnderwritingModule } from './underwriting/underwriting.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Automatically generate schema
      playground: true, // Optional: Enable the Apollo sandbox
    }),
    CqrsModule.forRoot(),
    UsersModule,
    ProductsModule,
    LoanOffersModule,
    LoanApplicationsModule,
    UnderwritingModule,
    ExternalChecksModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [
    AppService,
    AppResolver,
    HealthCheckService,
    Logger,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
        RequestLoggerMiddleware,
      )
      .forRoutes('*');
  }
}
