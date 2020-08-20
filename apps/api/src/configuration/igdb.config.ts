import { IsString, IsUrl } from 'class-validator';

export class IgdbConfig {
  @IsString()
  apiKey: string;

  @IsUrl()
  endpoint: string;
}
