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

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
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
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => GalleryEntity, (gallery) => gallery.user, {
    eager: false,
  })
  galleries: GalleryEntity[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
