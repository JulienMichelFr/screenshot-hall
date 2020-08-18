import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GalleryEntity } from '../../gallery/entities/gallery.entity';
import { OneToMany } from 'typeorm/index';
import { Exclude } from 'class-transformer';
import { IUser } from '@screenshot-hall/models';
import { ScreenshotEntity } from '../../screenshot/entities/screenshot.entity';
import { DefaultEntity } from '../../../utils/database/default-entity';

@Entity()
export class UserEntity extends DefaultEntity implements IUser {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  // Joins
  @OneToMany((type) => GalleryEntity, (gallery) => gallery.user, {
    eager: false,
    cascade: true,
  })
  galleries: GalleryEntity[];

  @OneToMany((type) => ScreenshotEntity, (screenshot) => screenshot.user, {
    eager: false,
    cascade: true,
  })
  screenshots: ScreenshotEntity[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
