import { IsString, IsUUID } from 'class-validator';

export class CreateScreenshotDTO {
  @IsString()
  name: string;
  @IsUUID()
  galleryId: string;
}
