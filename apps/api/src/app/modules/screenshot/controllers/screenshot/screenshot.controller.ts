import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { ScreenshotService } from '../../services/screenshot/screenshot.service';
import { ScreenshotSize } from '@screenshot-hall/models';
import { ScreenshotEntity } from '../../../database/entities/screenshot.entity';
import { DataService } from '../../../data/services/uploader/data.service';
import { Response as EResponse } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('screenshots')
export class ScreenshotController {
  constructor(
    private screenshotService: ScreenshotService,
    private dataService: DataService
  ) {}

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
