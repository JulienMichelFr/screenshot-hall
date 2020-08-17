import { IGallery, IUser } from '@screenshot-hall/models';
import { BaseModel } from '../../utils/base-model';

export interface IScreenshot extends BaseModel {
  name: string;
  gallery: IGallery;
  galleryId: string;
  user: IUser;
  userId: string;
}
