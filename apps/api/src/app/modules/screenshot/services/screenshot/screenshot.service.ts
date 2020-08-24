import { Injectable, NotFoundException } from '@nestjs/common';
import { ScreenshotRepository } from '../../../database/repositories/screenshot.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreenshotEntity } from '../../../database/entities/screenshot.entity';
import { GalleryRepository } from '../../../database/repositories/gallery.repository';
import { UserEntity } from '../../../database/entities/user.entity';

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

  async findOne(id: string): Promise<ScreenshotEntity> {
    try {
      return await this.screenshotRepository.findOneOrFail({ id });
    } catch (e) {
      throw new NotFoundException('Screenshot not found');
    }
  }

  async removeById(id: string, user: UserEntity): Promise<void> {
    return this.screenshotRepository.removeOne(id, user);
  }
}
