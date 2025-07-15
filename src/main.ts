import { instance } from 'logger/winston.logger';
import { WinstonModule } from 'nest-winston';
import supertokens from 'supertokens-node';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { IoAdapter } from '@nestjs/platform-socket.io';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://los-lender-staging.middle-earth.in',
    ],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(PORT);
  console.log(`🚀 Server is running on port ${PORT}`);
}
bootstrap();
