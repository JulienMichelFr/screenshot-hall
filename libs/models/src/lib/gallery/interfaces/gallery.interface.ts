import { IUser } from '../../auth/interfaces';
import { IScreenshot } from '../../screenshot/interfaces';
import { BaseModel } from '../../utils/base-model';
import { IGame, IPlatform } from '../../igdb/interfaces';

export interface IGallery extends BaseModel {
  name: string;
  screenshots: IScreenshot[];
  user: IUser;
  userId: string;
  game: IGame;
  platform: IPlatform;
}
