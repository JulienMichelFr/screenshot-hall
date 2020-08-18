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

  @ManyToOne((type) => GalleryEntity, (gallery) => gallery.screenshots, {
    eager: false,
    onDelete: 'CASCADE',
  })
  gallery: GalleryEntity;

  @Column()
  galleryId: string;

  @ManyToOne((type) => UserEntity, (user) => user.screenshots, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column()
  userId: string;
  @Column()
  file: string;
  @Column()
  mimetype: string;
}
