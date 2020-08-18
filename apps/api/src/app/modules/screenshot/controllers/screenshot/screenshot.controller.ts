import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScreenshotService } from '../../services/screenshot/screenshot.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateScreenshotDTO } from '@screenshot-hall/models';
import { GetUser } from '../../../auth/decorators/get-user.decorator';
import { UserEntity } from '../../../auth/entities/user.entity';
import { ScreenshotEntity } from '../../entities/screenshot.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../../../data/services/uploader/data.service';
import { IFile } from '../../../../utils/interfaces/file';
import { Response as EResponse } from 'express';

const MAX_SIZE = 5_000_000; //5Mb

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@Controller('screenshots')
export class ScreenshotController {
  constructor(
    private screenshotService: ScreenshotService,
    private dataService: DataService
  ) {}

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
    @GetUser() user: UserEntity,
    @Response() response: EResponse
  ) {
    const screenshot = await this.screenshotService.findOne(id, user);
    response.append('content-type', screenshot.mimetype);
    const file = await this.dataService.downloadScreenshot(
      user.id,
      screenshot.file
    );
    file.pipe(response);
  }
}
