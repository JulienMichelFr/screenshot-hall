import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppConfig } from './configuration/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: AppConfig = app.get<AppConfig>(AppConfig);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = config.port;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap().catch((err) => {
  console.error(err);
});
