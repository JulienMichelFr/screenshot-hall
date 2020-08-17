import { IUser } from '../../auth/interfaces';
import { IScreenshot } from '../../screenshot/interfaces';
import { BaseModel } from '../../utils/base-model';

export interface IGallery extends BaseModel {
  name: string;
  screenshots: IScreenshot[];
  user: IUser;
  userId: string;
}
