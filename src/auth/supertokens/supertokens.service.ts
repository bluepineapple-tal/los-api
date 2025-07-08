import supertokens from 'supertokens-node';

import { Inject, Injectable } from '@nestjs/common';

import { AuthModuleConfig, ConfigInjectionToken } from '../config.interface';
import { buildRecipeList } from './recipe-list.factory';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken)
    private readonly config: AuthModuleConfig,

    @Inject('SUPERTOKENS_RECIPE_LIST')
    private readonly recipeList: ReturnType<typeof buildRecipeList>,
  ) {
    supertokens.init({
      appInfo: this.config.appInfo,
      supertokens: {
        connectionURI: this.config.connectionURI,
        apiKey: this.config.apiKey,
      },
      recipeList: this.recipeList,
    });
  }
}
