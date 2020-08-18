import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppConfig } from '../apps/screenshot-hall/src/configuration/app.config';
import config from 'config';
import { writeFileSync } from 'fs';
import * as path from 'path';

async function generateConfig(): Promise<void> {
  const result = plainToClass(AppConfig, config.get('front'), {
    excludeExtraneousValues: true,
  });
  await validateOrReject(result);
  const json = JSON.stringify(result, null, 2);
  const configPath = path.join(
    __dirname,
    '../apps/screenshot-hall/src/assets/config.json'
  );
  writeFileSync(configPath, json);
}

generateConfig().catch(console.error);
