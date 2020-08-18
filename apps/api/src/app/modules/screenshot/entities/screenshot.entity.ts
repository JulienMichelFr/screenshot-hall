import { Column, Entity, ManyToOne } from 'typeorm/index';
import { IScreenshot } from '@screenshot-hall/models';
import { UserEntity } from '../../auth/entities/user.entity';
import { GalleryEntity } from '../../gallery/entities/gallery.entity';
import { DefaultEntity } from '../../../utils/database/default-entity';

@Entity()
export class ScreenshotEntity extends DefaultEntity implements IScreenshot {
  @Column()
  name: string;

  // Joins

  @ManyToOne((type) => GalleryEntity, (gallery) => gallery.screenshots)
  gallery: GalleryEntity;

  @Column()
  galleryId: string;

  @ManyToOne((type) => UserEntity)
  user: UserEntity;

  @Column()
  userId: string;
  @Column()
  file: string;
  @Column()
  mimetype: string;
}
