import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScreenshotService } from '../../services/screenshot/screenshot.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateScreenshotDTO, ScreenshotSize } from '@screenshot-hall/models';
import { GetUser } from '../../../auth/decorators/get-user.decorator';
import { UserEntity } from '../../../auth/entities/user.entity';
import { ScreenshotEntity } from '../../entities/screenshot.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../../../data/services/uploader/data.service';
import { IFile } from '../../../../utils/interfaces/file';
import { Response as EResponse } from 'express';

const MAX_SIZE = 5_000_000; //5Mb

@UseInterceptors(ClassSerializerInterceptor)
@Controller('screenshots')
export class ScreenshotController {
  constructor(
    private screenshotService: ScreenshotService,
    private dataService: DataService
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_SIZE } }))
  async createScreenshot(
    @UploadedFile() file: IFile,
    @Body() createScreenshotDTO: CreateScreenshotDTO,
    @GetUser() user: UserEntity
  ): Promise<ScreenshotEntity> {
    return this.screenshotService.createScreenshot(
      createScreenshotDTO,
      file,
      user
    );
  }

  @Get()
  findScreenshots(): Promise<ScreenshotEntity[]> {
    return this.screenshotService.findScreenshots();
  }

  @Get('/:id/download')
  async download(
    @Param('id') id: string,
    @Query('size') size: ScreenshotSize = ScreenshotSize.ORIGINAL,
    @Response() response: EResponse
  ) {
    const screenshot = await this.screenshotService.findOne(id);
    const img = screenshot.files[size];
    response.append('content-type', img.mimetype);
    const file = await this.dataService.downloadScreenshot(
      screenshot.userId,
      img.filename
    );
    file.pipe(response);
  }
}
