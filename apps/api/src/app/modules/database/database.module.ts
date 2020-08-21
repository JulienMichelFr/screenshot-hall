import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryRepository } from './repositories/gallery.repository';
import { ScreenshotRepository } from './repositories/screenshot.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GalleryRepository,
      ScreenshotRepository,
      UserRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
