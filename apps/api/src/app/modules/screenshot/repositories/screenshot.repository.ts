import { EntityRepository, Repository } from 'typeorm/index';
import { ScreenshotEntity } from '../entities/screenshot.entity';
import { CreateScreenshotDTO } from '@screenshot-hall/models';
import { UserEntity } from '../../auth/entities/user.entity';
import { GalleryEntity } from '../../gallery/entities/gallery.entity';

@EntityRepository(ScreenshotEntity)
export class ScreenshotRepository extends Repository<ScreenshotEntity> {
  async createScreenshot(
    createScreenshotDTO: CreateScreenshotDTO,
    gallery: GalleryEntity,
    user: UserEntity
  ): Promise<ScreenshotEntity> {
    const screenshot: ScreenshotEntity = new ScreenshotEntity();
    screenshot.gallery = gallery;
    screenshot.user = user;
    screenshot.name = createScreenshotDTO.name;
    screenshot.file = createScreenshotDTO.fileId;
    screenshot.mimetype = createScreenshotDTO.mimetype;
    await screenshot.save();
    return screenshot;
  }

  async findScreenshots(): Promise<ScreenshotEntity[]> {
    return this.find({
      relations: ['user', 'gallery'],
    });
  }
}
