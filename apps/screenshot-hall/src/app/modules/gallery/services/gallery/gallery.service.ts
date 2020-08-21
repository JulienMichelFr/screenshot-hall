import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AppConfig from '../../../../../configuration/app.config';
import {
  CreateGalleryDTO,
  IGallery,
  IScreenshot,
  IScreenshotFile,
  LargeScreenshotFile,
  MediumScreenshotFile,
  OriginalScreenshotFile,
  SmallScreenshotFile,
} from '@screenshot-hall/models';
import { map } from 'rxjs/operators';
import { ScreenshotService } from '../screenshot/screenshot.service';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly endpoint = `${this.config.api}/api/galleries`;

  constructor(
    private http: HttpClient,
    private config: AppConfig,
    private screenshotService: ScreenshotService
  ) {}

  public getGalleries(): Observable<IGallery[]> {
    return this.http.get<IGallery[]>(this.endpoint).pipe(
      map((galleries: IGallery[]) => {
        return galleries.map((gallery) => {
          gallery.cover = this.screenshotService.setUrls(gallery.cover);
          return gallery;
        });
      })
    );
  }

  public getGalleryById(id: string): Observable<IGallery> {
    return this.http.get<IGallery>(`${this.endpoint}/${id}`).pipe(
      map((gallery) => {
        return {
          ...gallery,
          screenshots: gallery.screenshots.map(
            (screenshot): IScreenshot => {
              return this.screenshotService.setUrls(screenshot);
            }
          ),
        };
      })
    );
  }

  public createGallery(
    createGalleryDTO: CreateGalleryDTO
  ): Observable<IGallery> {
    return this.http.post<IGallery>(this.endpoint, createGalleryDTO);
  }

  /*public updateGallery(
    id: string,
    { name, isPublic, game }: IGallery
  ): Promise<void> {
    return this.getGalleryById(id).update({ name, isPublic, game });
  }
  */
}
