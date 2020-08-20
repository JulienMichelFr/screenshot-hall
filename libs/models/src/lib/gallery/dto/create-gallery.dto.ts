import { IsObject, IsString, MaxLength, MinLength } from 'class-validator';
import { IGame, IPlatform } from '../../igdb/interfaces';

export class CreateGalleryDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @IsObject()
  platform: IPlatform;

  @IsObject()
  game: IGame;
}
