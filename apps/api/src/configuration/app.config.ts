import {
  IsNumber,
  IsOptional,
  IsPort,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DatabaseConfig } from './database.config';
import { TokenConfig } from './token.config';
import { MinioConfig } from './minio.config';
import { IgdbConfig } from './igdb.config';

export class AppConfig {
  @IsNumber()
  @IsOptional()
  port = 3333;

  @ValidateNested()
  database: DatabaseConfig;

  @ValidateNested()
  token: TokenConfig;

  @ValidateNested()
  minio: MinioConfig;

  @ValidateNested()
  igdb: IgdbConfig;
}
