import { IsMimeType, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateScreenshotDTO {
  @IsString()
  name: string;
  @IsUUID()
  galleryId: string;

  @IsOptional()
  @IsUUID()
  fileId?: string;
  @IsOptional()
  @IsMimeType()
  mimetype?: string;
}
