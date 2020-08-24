import { EntityRepository, Repository } from 'typeorm/index';
import { GalleryEntity } from '../entities/gallery.entity';
import { CreateGalleryDTO } from '@screenshot-hall/models';
import { UserEntity } from '../entities/user.entity';
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
    gallery.game = createGalleryDTO.game;
    gallery.platform = createGalleryDTO.platform;

    await gallery.save();

    return gallery;
  }

  async findGalleries(): Promise<GalleryEntity[]> {
    return this.find({
      relations: ['user'],
    });
  }

  async findGallyById(id: string): Promise<GalleryEntity> {
    const gallery = await this.findOneOrFail(
      {
        id,
      },
      { relations: ['user', 'screenshots'] }
    );

    gallery.screenshots = gallery.screenshots.filter((s) => !s.deletedAt);

    return gallery;
  }

  async removeGallery(galleryId: string, user: UserEntity) {
    const gallery: GalleryEntity = await this.findOne(
      {
        id: galleryId,
        userId: user.id,
      },
      { relations: ['screenshots'] }
    );
    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }
    await gallery.softRemove({});
  }
}
