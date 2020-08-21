import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GalleryService } from './services/gallery/gallery.service';
import { GalleryController } from './controllers/gallery/gallery.controller';
import { DatabaseModule } from '../database/database.module';
import { DataModule } from '../data/data.module';

@Module({
  imports: [AuthModule, DatabaseModule, DataModule],
  providers: [GalleryService],
  controllers: [GalleryController],
  exports: [],
})
export class GalleryModule {}
