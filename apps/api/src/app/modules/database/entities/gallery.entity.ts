import { Column, Entity, ManyToOne, OneToMany } from 'typeorm/index';
import {
  IGallery,
  IGame,
  IPlatform,
  IScreenshot,
} from '@screenshot-hall/models';
import { UserEntity } from './user.entity';
import { ScreenshotEntity } from './screenshot.entity';
import { DefaultEntity } from '../../../utils/database/default-entity';

@Entity()
export class GalleryEntity extends DefaultEntity implements IGallery {
  @Column()
  name: string;

  @Column('json')
  platform: IPlatform;

  @Column('json')
  game: IGame;

  // Joins

  @OneToMany((type) => ScreenshotEntity, (screenshot) => screenshot.gallery, {
    eager: false,
    cascade: true,
  })
  screenshots: ScreenshotEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.galleries, {
    eager: false,
  })
  user: UserEntity;

  @Column()
  userId: string;

  cover?: IScreenshot;
}
