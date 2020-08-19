import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: string): Promise<GalleryEntity> {
    try {
      return await this.galleryRepository.findGallyById(id);
    } catch (e) {
      throw new NotFoundException('Gallery not found');
    }
  }

  async removeGallery(galleryId: string, user: UserEntity): Promise<void> {
    return this.galleryRepository.removeGallery(galleryId, user);
  }
}
