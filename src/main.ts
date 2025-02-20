import { NestFactory } from '@nestjs/core';
import { instance } from 'logger/winston.logger';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server is running on port ${PORT}`);
}
bootstrap();
