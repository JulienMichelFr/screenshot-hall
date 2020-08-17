import { EntityRepository, Repository } from 'typeorm/index';
import { GalleryEntity } from '../entities/gallery.entity';
import { CreateGalleryDTO } from '@screenshot-hall/models';
import { UserEntity } from '../../auth/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(GalleryEntity)
export class GalleryRepository extends Repository<GalleryEntity> {
  async createGallery(
    createGalleryDTO: CreateGalleryDTO,
    user: UserEntity
  ): Promise<GalleryEntity> {
    const gallery = new GalleryEntity();
    gallery.name = createGalleryDTO.name;
    gallery.user = user;

    await gallery.save();

    return gallery;
  }

  async findGalleries(): Promise<GalleryEntity[]> {
    return this.find({
      relations: ['user'],
    });
  }

  async removeGallery(galleryId: string, user: UserEntity) {
    const gallery: GalleryEntity = await this.findOne({
      id: galleryId,
      userId: user.id,
    });
    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }
    await gallery.softRemove();
  }
}
