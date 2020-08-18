import { IsBoolean, IsString, IsUrl } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';

export class AppConfig {
  @IsString()
  @Expose()
  api: string;

  @IsBoolean()
  @Expose()
  isProd: boolean;

  static fromPlain(data: any): AppConfig {
    return plainToClass(AppConfig, data, { excludeExtraneousValues: true });
  }
}

export default AppConfig;
