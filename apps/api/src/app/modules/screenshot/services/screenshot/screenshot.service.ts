import { Injectable, NotFoundException } from '@nestjs/common';
import { ScreenshotRepository } from '../../repositories/screenshot.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreenshotEntity } from '../../entities/screenshot.entity';
import { CreateScreenshotDTO } from '@screenshot-hall/models';
import { GalleryEntity } from '../../../gallery/entities/gallery.entity';
import { UserEntity } from '../../../auth/entities/user.entity';
import { GalleryRepository } from '../../../gallery/repositories/gallery.repository';

@Injectable()
export class ScreenshotService {
  constructor(
    @InjectRepository(ScreenshotRepository)
    private screenshotRepository: ScreenshotRepository,
    @InjectRepository(GalleryRepository)
    private galleryRepository: GalleryRepository
  ) {}

  findScreenshots(): Promise<ScreenshotEntity[]> {
    return this.screenshotRepository.findScreenshots();
  }

  async createScreenshot(
    createScreenshotDTO: CreateScreenshotDTO,
    user: UserEntity
  ): Promise<ScreenshotEntity> {
    const gallery = await this.galleryRepository.findOne({
      id: createScreenshotDTO.galleryId,
      userId: user.id,
    });
    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }

    return this.screenshotRepository.createScreenshot(
      createScreenshotDTO,
      gallery,
      user
    );
  }
}
