import { AuthModuleConfig } from 'src/auth/config.interface';

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
