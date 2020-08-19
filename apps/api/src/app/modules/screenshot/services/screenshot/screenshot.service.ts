import { Injectable, NotFoundException } from '@nestjs/common';
import { ScreenshotRepository } from '../../repositories/screenshot.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreenshotEntity } from '../../entities/screenshot.entity';
import { CreateScreenshotDTO, ScreenshotFiles } from '@screenshot-hall/models';
import { UserEntity } from '../../../auth/entities/user.entity';
import { GalleryRepository } from '../../../gallery/repositories/gallery.repository';
import { IFile } from '../../../../utils/interfaces/file';
import { DataService } from '../../../data/services/uploader/data.service';

@Injectable()
export class ScreenshotService {
  constructor(
    @InjectRepository(ScreenshotRepository)
    private screenshotRepository: ScreenshotRepository,
    @InjectRepository(GalleryRepository)
    private galleryRepository: GalleryRepository,
    private uploaderService: DataService
  ) {}

  findScreenshots(): Promise<ScreenshotEntity[]> {
    return this.screenshotRepository.findScreenshots();
  }

  async createScreenshot(
    createScreenshotDTO: CreateScreenshotDTO,
    file: IFile,
    user: UserEntity
  ): Promise<ScreenshotEntity> {
    const gallery = await this.galleryRepository.findOne({
      id: createScreenshotDTO.galleryId,
      userId: user.id,
    });
    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }

    const files: ScreenshotFiles = await this.uploaderService.uploadScreenshot(
      user.id,
      file
    );

    return this.screenshotRepository.createScreenshot(
      createScreenshotDTO,
      gallery,
      files,
      user
    );
  }

  async findOne(id: string): Promise<ScreenshotEntity> {
    return this.screenshotRepository.findOne({ id });
  }
}
