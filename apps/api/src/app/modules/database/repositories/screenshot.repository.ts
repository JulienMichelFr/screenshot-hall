import { EntityRepository, Repository } from 'typeorm/index';
import { ScreenshotEntity } from '../entities/screenshot.entity';
import { ScreenshotFiles } from '@screenshot-hall/models';
import { UserEntity } from '../entities/user.entity';
import { GalleryEntity } from '../entities/gallery.entity';

@EntityRepository(ScreenshotEntity)
export class ScreenshotRepository extends Repository<ScreenshotEntity> {
  async createScreenshot(
    gallery: GalleryEntity,
    filename: string,
    files: ScreenshotFiles,
    user: UserEntity
  ): Promise<ScreenshotEntity> {
    const screenshot: ScreenshotEntity = new ScreenshotEntity();
    screenshot.gallery = gallery;
    screenshot.user = user;
    screenshot.name = filename;
    screenshot.files = files;
    await screenshot.save();
    return screenshot;
  }

  async findScreenshots(): Promise<ScreenshotEntity[]> {
    return this.find({
      relations: ['user', 'gallery'],
    });
  }
}
