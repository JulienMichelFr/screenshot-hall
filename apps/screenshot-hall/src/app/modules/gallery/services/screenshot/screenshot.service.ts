import { Injectable } from '@angular/core';
import AppConfig from '../../../../../configuration/app.config';
import {
  IScreenshot,
  IScreenshotFile,
  LargeScreenshotFile,
  MediumScreenshotFile,
  OriginalScreenshotFile,
  SmallScreenshotFile,
} from '@screenshot-hall/models';

@Injectable({
  providedIn: 'root',
})
export class ScreenshotService {
  constructor(private config: AppConfig) {}

  setUrls(screenshot: IScreenshot): IScreenshot {
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
        medium: withUrl(screenshot.files.medium) as MediumScreenshotFile,
        large: withUrl(screenshot.files.large) as LargeScreenshotFile,
        original: withUrl(screenshot.files.original) as OriginalScreenshotFile,
      },
    };
  }
}
