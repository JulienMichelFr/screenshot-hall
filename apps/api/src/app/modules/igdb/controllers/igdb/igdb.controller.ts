import { Controller, Get, Query } from '@nestjs/common';
import { IgdbService } from '../../services/igdb/igdb.service';
import { Observable } from 'rxjs';
import { IGame } from '@screenshot-hall/models';

@Controller('igdb')
export class IgdbController {
  constructor(private igdbService: IgdbService) {}

  @Get('')
  get(@Query('search') search = ''): Observable<IGame[]> {
    return this.igdbService.searchGame(search);
  }
}
