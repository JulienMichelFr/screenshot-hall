import { IsNumber, IsOptional, IsPort, ValidateNested } from 'class-validator';
import { DatabaseConfig } from './database.config';
import { TokenConfig } from './token.config';

export class AppConfig {
  @IsNumber()
  @IsOptional()
  port = 3333;

  @ValidateNested()
  database: DatabaseConfig;

  @ValidateNested()
  token: TokenConfig;
}
