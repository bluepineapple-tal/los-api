import { SuperTokensConfigService } from 'src/config/supertokens.config';
import { User } from 'src/users/user.entity';

import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './auth.middleware';
import { ConfigInjectionToken } from './config.interface';
import { RecipeListProvider } from './supertokens/recipe-list.factory';
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
        RecipeListProvider,
        SupertokensService,
      ],
      exports: [],
      imports: [TypeOrmModule.forFeature([User])],
      module: AuthModule,
    };
  }
}
