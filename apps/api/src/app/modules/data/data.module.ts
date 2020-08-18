import { Module } from '@nestjs/common';
import { DataService } from './services/uploader/data.service';

@Module({
  providers: [DataService],
  exports: [DataService],
  controllers: [],
})
export class DataModule {}
