import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
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

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@Controller('screenshots')
export class ScreenshotController {
  constructor(private screenshotService: ScreenshotService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createScreenshot(
    @Body() createScreenshotDTO: CreateScreenshotDTO,
    @GetUser() user: UserEntity
  ): Promise<ScreenshotEntity> {
    return this.screenshotService.createScreenshot(createScreenshotDTO, user);
  }

  @Get()
  findScreenshots(): Promise<ScreenshotEntity[]> {
    return this.screenshotService.findScreenshots();
  }
}
