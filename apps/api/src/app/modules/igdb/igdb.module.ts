import { HttpModule, Module } from '@nestjs/common';
import { IgdbService } from './services/igdb/igdb.service';
import { IgdbController } from './controllers/igdb/igdb.controller';

@Module({
  imports: [HttpModule],
  providers: [IgdbService],
  controllers: [IgdbController],
})
export class IgdbModule {}
