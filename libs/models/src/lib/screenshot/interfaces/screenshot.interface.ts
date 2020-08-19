import { IGallery, IUser } from '@screenshot-hall/models';
import { BaseModel } from '../../..';
import { ScreenshotFiles } from './screenshot-file.interface';

export interface IScreenshot extends BaseModel {
  name: string;
  gallery: IGallery;
  galleryId: string;
  user: IUser;
  userId: string;
  files: ScreenshotFiles;
}
