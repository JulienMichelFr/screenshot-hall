import { Injectable, NotFoundException } from '@nestjs/common';
import { GalleryRepository } from '../../../database/repositories/gallery.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGalleryDTO, ScreenshotFiles } from '@screenshot-hall/models';
import { UserEntity } from '../../../database/entities/user.entity';
import { GalleryEntity } from '../../../database/entities/gallery.entity';
import { IFile } from '../../../../utils/interfaces/file';
import { ScreenshotEntity } from '../../../database/entities/screenshot.entity';
import { ScreenshotRepository } from '../../../database/repositories/screenshot.repository';
import { DataService } from '../../../data/services/uploader/data.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryRepository)
    private readonly galleryRepository: GalleryRepository,

    @InjectRepository(ScreenshotRepository)
    private readonly screenshotRepository: ScreenshotRepository,

    private readonly dataService: DataService
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

  async createScreenshot(
    galleryId: string,
    file: IFile,
    user: UserEntity
  ): Promise<ScreenshotEntity> {
    const gallery = await this.galleryRepository.findOne({
      id: galleryId,
      userId: user.id,
    });
    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }

    const files: ScreenshotFiles = await this.dataService.uploadScreenshot(
      user.id,
      file
    );

    return this.screenshotRepository.createScreenshot(
      gallery,
      file.originalname,
      files,
      user
    );
  }
}
