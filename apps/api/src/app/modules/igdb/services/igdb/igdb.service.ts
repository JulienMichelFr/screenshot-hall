import { HttpService, Injectable } from '@nestjs/common';
import { AppConfig } from '../../../../../configuration/app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IGame } from '@screenshot-hall/models';

@Injectable()
export class IgdbService {
  private readonly endpoint = this.config.igdb.endpoint;
  private readonly header = {
    'user-key': this.config.igdb.apiKey,
  };

  constructor(private config: AppConfig, private http: HttpService) {}

  searchGame(search: string): Observable<IGame[]> {
    const fields =
      'fields name,platforms.name,platforms.slug,first_release_date,slug,bundles,parent_game,version_parent;';
    const baseWhere =
      'where version_parent = null & first_release_date != null';
    const dataString = `${baseWhere} & name ~ *"${search}"*;${fields}`;
    return this.http
      .post(`${this.endpoint}/games`, dataString, {
        headers: {
          'content-type': 'text-plain',
          ...this.header,
        },
      })
      .pipe(map(({ data }) => data));
  }
}
