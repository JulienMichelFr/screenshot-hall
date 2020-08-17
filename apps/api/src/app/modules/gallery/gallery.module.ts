import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { GalleryService } from './services/gallery/gallery.service';
import { GalleryRepository } from './repositories/gallery.repository';
import { GalleryController } from './controllers/gallery/gallery.controller';
import { GalleryEntity } from './entities/gallery.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([GalleryRepository])],
  providers: [GalleryService],
  controllers: [GalleryController],
})
export class GalleryModule {}
