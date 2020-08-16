import { IsString } from 'class-validator';

export class TokenConfig {
  @IsString()
  secret: string;

  @IsString()
  expiration: string;
}
