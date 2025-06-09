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
    signUpFeature: {
      formFields: [
        {
          id: 'name',
          validate: async (value: string) =>
            value.trim().length >= 3 ? undefined : 'Name is too short',
        },
        {
          id: 'avatar',
          optional: true,
          validate: async (value: string) =>
            value === '' || /^https?:\/\//.test(value)
              ? undefined
              : 'Enter a valid URL',
        },
      ],
    },
    override: {
      apis: (original) =>
        ({
          ...original,
          signUpPOST: async (input) => {
            const res = await original.signUpPOST(input);

            if (res.status === 'OK') {
              const name = input.formFields.find((f) => f.id === 'name')
                .value as string;
              const avatar =
                (input.formFields.find((f) => f.id === 'avatar')
                  ?.value as string) ?? '';

              // Persist extra data
              await UserMetadata.updateUserMetadata(res.user.id, {
                name,
                avatar,
              });

              // Push it into the brand-new session’s access token
              await res.session.mergeIntoAccessTokenPayload({ name, avatar });
            }

            return res;
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
