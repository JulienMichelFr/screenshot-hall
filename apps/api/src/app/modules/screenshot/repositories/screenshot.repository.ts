import { EntityRepository, Repository } from 'typeorm/index';
import { ScreenshotEntity } from '../entities/screenshot.entity';
import { CreateScreenshotDTO } from '@screenshot-hall/models';
import { UserEntity } from '../../auth/entities/user.entity';
import { GalleryEntity } from '../../gallery/entities/gallery.entity';
import { ScreenshotFiles } from '../../../../../../../libs/models/src/lib/screenshot/interfaces/screenshot-file.interface';

@EntityRepository(ScreenshotEntity)
export class ScreenshotRepository extends Repository<ScreenshotEntity> {
  async createScreenshot(
    createScreenshotDTO: CreateScreenshotDTO,
    gallery: GalleryEntity,
    files: ScreenshotFiles,
    user: UserEntity
  ): Promise<ScreenshotEntity> {
    const screenshot: ScreenshotEntity = new ScreenshotEntity();
    screenshot.gallery = gallery;
    screenshot.user = user;
    screenshot.name = createScreenshotDTO.name;
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
