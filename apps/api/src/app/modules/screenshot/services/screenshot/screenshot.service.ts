import { Injectable } from '@nestjs/common';
import { ScreenshotRepository } from '../../../database/repositories/screenshot.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreenshotEntity } from '../../../database/entities/screenshot.entity';
import { GalleryRepository } from '../../../database/repositories/gallery.repository';

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
    return this.screenshotRepository.findOne({ id });
  }
}
