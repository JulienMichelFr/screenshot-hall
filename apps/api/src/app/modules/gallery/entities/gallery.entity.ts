import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { IGallery } from '@screenshot-hall/models';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity()
export class GalleryEntity extends BaseEntity implements IGallery {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @Column()
  name: string;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne((type) => UserEntity, (user) => user.galleries, { eager: false })
  user: UserEntity;

  @Column()
  userId: string;
}
