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
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @UseGuards(AuthGuard())
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

  @Get('/:id')
  findGalleryById(@Param('id') id: string): Promise<GalleryEntity> {
    return this.galleryService.findById(id);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  removeGallery(
    @Param('id') id: string,
    @GetUser() user: UserEntity
  ): Promise<void> {
    return this.galleryService.removeGallery(id, user);
  }
}
