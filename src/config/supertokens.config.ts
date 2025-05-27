import { AuthModuleConfig } from 'src/auth/config.interface';
import Dashboard from 'supertokens-node/recipe/dashboard';
import EmailPassword, {
  APIInterface,
} from 'supertokens-node/recipe/emailpassword';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import UserRoles from 'supertokens-node/recipe/userroles';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
  EmailPassword.init({
    override: {
      apis: (original) =>
        ({
          ...original,
          signUpPOST: async (input) => {
            // First let the core do its normal work
            const response = await original.signUpPOST(input);

            if (response.status === 'OK') {
              // 1. Pull the extra fields
              const name = input.formFields.find((f) => f.id === 'name')
                ?.value as string;
              const avatar = input.formFields.find((f) => f.id === 'avatar')
                ?.value as string;

              // 2. Persist them in UserMetadata
              await UserMetadata.updateUserMetadata(response.user.id, {
                name,
                avatar,
              });

              // 3. OPTIONAL – push them into the access-token payload
              //    so the frontend can read them without another API call:
              const session = await Session.getSessionWithoutRequestResponse(
                response.user.id,
              );
              await session.mergeIntoAccessTokenPayload({
                name,
                avatar,
              });
            }
            return response;
          },
        }) satisfies APIInterface,
    },
  }),
  Passwordless.init({
    contactMethod: 'EMAIL_OR_PHONE',
    flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
  }),
  Session.init({
    exposeAccessTokenToFrontendInCookieBasedAuth: true,
  }),
  Dashboard.init(),
  UserRoles.init(),
  UserMetadata.init(),
];
