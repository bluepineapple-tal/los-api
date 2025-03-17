import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModuleConfig } from 'src/auth/config.interface';
import Dashboard from 'supertokens-node/recipe/dashboard';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';

@Injectable()
export class SuperTokensConfigService {
  constructor(private readonly configService: ConfigService) {}

  createAuthModuleConfig(): AuthModuleConfig {
    return {
      appInfo: {
        appName: this.configService.get<string>('APP_NAME') ?? 'LOS',
        apiDomain:
          this.configService.get<string>('API_DOMAIN') ??
          'http://localhost:8000',
        websiteDomain:
          this.configService.get<string>('WEBSITE_DOMAIN') ??
          'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
      connectionURI: this.configService.get<string>(
        'SUPERTOKENS_CONNECTION_URI',
      ),
      apiKey: this.configService.get<string>('SUPERTOKENS_API_KEY'),
    };
  }
}

export const SUPERTOKENS_RECIPE_LIST = [
  EmailPassword.init(),
  Passwordless.init({
    contactMethod: 'EMAIL_OR_PHONE',
    flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
  }),
  Session.init({
    exposeAccessTokenToFrontendInCookieBasedAuth: true,
  }),
  Dashboard.init(),
  UserRoles.init(),
];
