import { Module } from '@nestjs/common';
import { ScreenshotService } from './services/screenshot/screenshot.service';
import { ScreenshotController } from './controllers/screenshot/screenshot.controller';
import { AuthModule } from '../auth/auth.module';
import { DataModule } from '../data/data.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [AuthModule, DataModule, DatabaseModule],
  providers: [ScreenshotService],
  controllers: [ScreenshotController],
})
export class ScreenshotModule {}
