import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GalleryService } from '../../services/gallery/gallery.service';
import { CreateGalleryDTO } from '@screenshot-hall/models';
import { GetUser } from '../../../auth/decorators/get-user.decorator';
import { UserEntity } from '../../../auth/entities/user.entity';
import { GalleryEntity } from '../../entities/gallery.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('galleries')
@UseGuards(AuthGuard())
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createGallery(
    @Body() createGalleryDTO: CreateGalleryDTO,
    @GetUser() user: UserEntity
  ): Promise<GalleryEntity> {
    return this.galleryService.create(createGalleryDTO, user);
  }

  @Get()
  findGalleries(): Promise<GalleryEntity[]> {
    return this.galleryService.findAll();
  }

  @Delete('/:id')
  removeGallery(
    @Param('id') id: string,
    @GetUser() user: UserEntity
  ): Promise<void> {
    return this.galleryService.removeGallery(id, user);
  }
}
