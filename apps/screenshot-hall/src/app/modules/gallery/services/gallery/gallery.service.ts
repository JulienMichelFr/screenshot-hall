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

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly endpoint = `${this.config.api}/api/galleries`;

  constructor(private http: HttpClient, private config: AppConfig) {}

  public getGalleries(): Observable<IGallery[]> {
    return this.http.get<IGallery[]>(this.endpoint);
  }

  public getGalleryById(id: string): Observable<IGallery> {
    return this.http.get<IGallery>(`${this.endpoint}/${id}`).pipe(
      map((gallery) => {
        return {
          ...gallery,
          screenshots: gallery.screenshots.map(
            (screenshot): IScreenshot => {
              const withUrl = (screen: IScreenshotFile): IScreenshotFile => {
                return {
                  ...screen,
                  url: `${this.config.api}/api/screenshots/${screenshot.id}/download?size=${screen.size}`,
                };
              };
              return {
                ...screenshot,
                files: {
                  small: withUrl(screenshot.files.small) as SmallScreenshotFile,
                  medium: withUrl(
                    screenshot.files.medium
                  ) as MediumScreenshotFile,
                  large: withUrl(screenshot.files.large) as LargeScreenshotFile,
                  original: withUrl(
                    screenshot.files.original
                  ) as OriginalScreenshotFile,
                },
              };
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
