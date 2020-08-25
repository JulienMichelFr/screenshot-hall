import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GalleryService } from '../../services/gallery/gallery.service';
import { CreateGalleryDTO } from '@screenshot-hall/models';
import { GetUser } from '../../../auth/decorators/get-user.decorator';
import { UserEntity } from '../../../database/entities/user.entity';
import { GalleryEntity } from '../../../database/entities/gallery.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MAX_FILE_SIZE } from '../../../../../utils/contantes';
import { IFile } from '../../../../utils/interfaces/file';
import { ScreenshotEntity } from '../../../database/entities/screenshot.entity';
import { ScreenshotService } from '../../../screenshot/services/screenshot/screenshot.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('galleries')
export class GalleryController {
  constructor(
    private galleryService: GalleryService,
    private screenshotService: ScreenshotService
  ) {}

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

  @Get('/:id/screenshots')
  findScreenshotByGalleryId(
    @Param('id') id: string
  ): Promise<ScreenshotEntity[]> {
    return this.screenshotService.findByGallery(id);
  }

  @UseGuards(AuthGuard())
  @UseInterceptors(
    FilesInterceptor('files', 10 /*{ limits: { fileSize: MAX_FILE_SIZE } }*/)
  )
  @Post('/:id/screenshots')
  async uploadScreenshot(
    @UploadedFiles() files: IFile[],
    @GetUser() user: UserEntity,
    @Param('id') id: string
  ) {
    return await Promise.all(
      files.map((file) => this.galleryService.createScreenshot(id, file, user))
    );
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
