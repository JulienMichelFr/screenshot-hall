import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGalleryDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;
}
