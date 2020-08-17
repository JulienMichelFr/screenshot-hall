import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { GalleryService } from './services/gallery/gallery.service';
import { GalleryRepository } from './repositories/gallery.repository';
import { GalleryController } from './controllers/gallery/gallery.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([GalleryRepository])],
  providers: [GalleryService],
  controllers: [GalleryController],
  exports: [],
})
export class GalleryModule {}
