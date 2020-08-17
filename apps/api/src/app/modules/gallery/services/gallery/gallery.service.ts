import { Injectable } from '@nestjs/common';
import { GalleryRepository } from '../../repositories/gallery.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGalleryDTO } from '@screenshot-hall/models';
import { UserEntity } from '../../../auth/entities/user.entity';
import { GalleryEntity } from '../../entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryRepository)
    private readonly galleryRepository: GalleryRepository
  ) {}

  async create(
    createGalleryDTO: CreateGalleryDTO,
    user: UserEntity
  ): Promise<GalleryEntity> {
    return this.galleryRepository.createGallery(createGalleryDTO, user);
  }

  async findAll(): Promise<GalleryEntity[]> {
    return this.galleryRepository.findGalleries();
  }

  async removeGallery(galleryId: string, user: UserEntity): Promise<void> {
    return this.galleryRepository.removeGallery(galleryId, user);
  }
}
