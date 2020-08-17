import { IGallery } from '../../gallery/interfaces';
import { IScreenshot } from '../../screenshot/interfaces';
import { BaseModel } from '../../utils/base-model';

export interface IUser extends BaseModel {
  username: string;
  email: string;
  password: string;
  galleries: IGallery[];
  screenshots: IScreenshot[];
}
