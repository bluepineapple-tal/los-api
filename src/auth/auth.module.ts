import { SuperTokensConfigService } from 'src/config/supertokens.config';

import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthMiddleware } from './auth.middleware';
import { ConfigInjectionToken } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';

@Module({
  providers: [],
  exports: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot(): DynamicModule {
    return {
      providers: [
        SuperTokensConfigService,
        {
          provide: ConfigInjectionToken,
          useFactory: (cfgSvc: SuperTokensConfigService) => {
            return cfgSvc.createAuthModuleConfig();
          },
          inject: [SuperTokensConfigService],
        },
        SupertokensService,
      ],
      exports: [],
      imports: [ConfigModule],
      module: AuthModule,
    };
  }
}
