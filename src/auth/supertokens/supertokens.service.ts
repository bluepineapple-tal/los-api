import { SUPERTOKENS_RECIPE_LIST } from 'src/config/supertokens.config';
import supertokens from 'supertokens-node';

import { Inject, Injectable } from '@nestjs/common';

import { AuthModuleConfig, ConfigInjectionToken } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private readonly config: AuthModuleConfig,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: SUPERTOKENS_RECIPE_LIST,
    });
  }
}
