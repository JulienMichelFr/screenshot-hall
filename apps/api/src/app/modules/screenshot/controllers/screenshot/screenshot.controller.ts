import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Response,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ScreenshotService } from '../../services/screenshot/screenshot.service';
import { ScreenshotSize } from '@screenshot-hall/models';
import { ScreenshotEntity } from '../../../database/entities/screenshot.entity';
import { DataService } from '../../../data/services/uploader/data.service';
import { Response as EResponse } from 'express';
import { GetUser } from '../../../auth/decorators/get-user.decorator';
import { UserEntity } from '../../../database/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard())
  @Delete('/:id')
  async remove(
    @Param('id') id: string,
    @GetUser() user: UserEntity
  ): Promise<void> {
    return this.screenshotService.removeById(id, user);
  }
}
