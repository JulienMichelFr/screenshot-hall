import { Module } from '@nestjs/common';
import { ScreenshotService } from './services/screenshot/screenshot.service';
import { ScreenshotController } from './controllers/screenshot/screenshot.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenshotRepository } from './repositories/screenshot.repository';
import { GalleryModule } from '../gallery/gallery.module';
import { GalleryRepository } from '../gallery/repositories/gallery.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ScreenshotRepository, GalleryRepository]),
    GalleryModule,
  ],
  providers: [ScreenshotService],
  controllers: [ScreenshotController],
})
export class ScreenshotModule {}
