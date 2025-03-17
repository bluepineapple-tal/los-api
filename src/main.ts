import { instance } from 'logger/winston.logger';
import { WinstonModule } from 'nest-winston';
import supertokens from 'supertokens-node';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SupertokensExceptionFilter } from './auth/auth.filter';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(PORT);
  console.log(`🚀 Server is running on port ${PORT}`);
}
bootstrap();
