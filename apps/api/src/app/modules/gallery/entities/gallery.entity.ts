import { Column, Entity, ManyToOne, OneToMany } from 'typeorm/index';
import { IGallery } from '@screenshot-hall/models';
import { UserEntity } from '../../auth/entities/user.entity';
import { ScreenshotEntity } from '../../screenshot/entities/screenshot.entity';
import { DefaultEntity } from '../../../utils/database/default-entity';

@Entity()
export class GalleryEntity extends DefaultEntity implements IGallery {
  @Column()
  name: string;

  // Joins

  @OneToMany((type) => ScreenshotEntity, (screenshot) => screenshot.gallery, {
    eager: false,
  })
  screenshots: ScreenshotEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.galleries, { eager: false })
  user: UserEntity;

  @Column()
  userId: string;
}
