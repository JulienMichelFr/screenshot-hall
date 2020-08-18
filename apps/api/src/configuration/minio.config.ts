import { IsBoolean, IsOptional, IsPort, IsString } from 'class-validator';
import { ClientOptions } from 'minio';

export class MinioConfig implements ClientOptions {
  @IsString()
  accessKey: string;
  @IsString()
  secretKey: string;
  @IsString()
  endPoint: string;
  @IsPort()
  port: number;
  @IsBoolean()
  @IsOptional()
  useSSL = false;
}
