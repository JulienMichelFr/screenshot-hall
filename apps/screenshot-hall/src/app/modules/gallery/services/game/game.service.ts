import { Injectable } from '@angular/core';
import AppConfig from '../../../../../configuration/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGame } from '@screenshot-hall/models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly endpoint = `${this.config.api}/api/igdb`;

  constructor(private config: AppConfig, private http: HttpClient) {}

  searchGame(search: string): Observable<IGame[]> {
    return this.http.get<IGame[]>(this.endpoint, { params: { search } });
  }
}
